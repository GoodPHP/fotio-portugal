/**
 * A minimal Search Console API client: a service-account token and the two
 * endpoints the export needs. No SDK — `googleapis` is 80 MB for two calls.
 *
 * Credentials come from the environment and nowhere else:
 *
 *   GOOGLE_SA_JSON   the service account's JSON key, base64-encoded (or raw)
 *
 * The key never reaches a log line or a file this module writes. Add the
 * service account's e-mail as a user on the Search Console property
 * (Settings → Users and permissions → Restricted is enough).
 */
import { createSign } from 'node:crypto';

const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const API = 'https://searchconsole.googleapis.com/webmasters/v3';

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

export function readServiceAccount(env: NodeJS.ProcessEnv = process.env): ServiceAccount {
  const raw = env.GOOGLE_SA_JSON?.trim();
  if (!raw) {
    throw new Error('GOOGLE_SA_JSON is not set. See scripts/gsc/README.md for how to create and provide it.');
  }
  const json = raw.startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
  let parsed: Partial<ServiceAccount>;
  try {
    parsed = JSON.parse(json);
  } catch {
    // The message names the variable, never its contents.
    throw new Error('GOOGLE_SA_JSON is neither JSON nor base64-encoded JSON.');
  }
  if (!parsed.client_email || !parsed.private_key) {
    throw new Error('GOOGLE_SA_JSON has no client_email or private_key; is it a service-account key?');
  }
  return { client_email: parsed.client_email, private_key: parsed.private_key };
}

const b64url = (input: string | Buffer) => Buffer.from(input).toString('base64url');

async function accessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  );
  const signature = createSign('RSA-SHA256').update(`${header}.${claims}`).sign(sa.private_key);
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${b64url(signature)}`,
    }),
  });
  const body = (await response.json()) as { access_token?: string; error?: string; error_description?: string };
  if (!response.ok || !body.access_token) {
    throw new Error(`Token exchange failed (${response.status}): ${body.error ?? ''} ${body.error_description ?? ''}`.trim());
  }
  return body.access_token;
}

export interface SearchAnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SearchAnalyticsQuery {
  startDate: string;
  endDate: string;
  dimensions: string[];
  type?: 'web' | 'image' | 'video' | 'news' | 'discover' | 'googleNews';
  dataState?: 'final' | 'all';
}

export class GscClient {
  private constructor(private readonly token: string) {}

  static async connect(env: NodeJS.ProcessEnv = process.env): Promise<GscClient> {
    return new GscClient(await accessToken(readServiceAccount(env)));
  }

  private async call<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API}${path}`, {
      ...init,
      headers: { authorization: `Bearer ${this.token}`, 'content-type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Search Console ${path} → ${response.status}: ${(await response.text()).slice(0, 500)}`);
    }
    return (await response.json()) as T;
  }

  async sites(): Promise<Array<{ siteUrl: string; permissionLevel: string }>> {
    const body = await this.call<{ siteEntry?: Array<{ siteUrl: string; permissionLevel: string }> }>('/sites');
    return body.siteEntry ?? [];
  }

  /**
   * Every row for a query, paging past the API's 25,000-row page size.
   * Search Console still drops anonymized queries and caps what it returns per
   * day and property, so a total from these rows can be below the UI's chart.
   */
  async searchAnalytics(siteUrl: string, query: SearchAnalyticsQuery): Promise<SearchAnalyticsRow[]> {
    const rows: SearchAnalyticsRow[] = [];
    const rowLimit = 25000;
    for (let startRow = 0; ; startRow += rowLimit) {
      const body = await this.call<{ rows?: SearchAnalyticsRow[] }>(
        `/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
        { method: 'POST', body: JSON.stringify({ ...query, rowLimit, startRow }) },
      );
      rows.push(...(body.rows ?? []));
      if (!body.rows || body.rows.length < rowLimit) return rows;
    }
  }
}
