const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const TIMEOUT_MS = 5000;
const MAX_ATTEMPTS = 2;

/**
 * Send a plain-text/HTML alert to the configured Telegram chat.
 * Returns false on misconfiguration or repeated failure — callers must treat
 * Telegram as a best-effort internal notification, never a hard dependency.
 */
export async function sendTelegramAlert(text: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error('[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured');
    return false;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) return true;
      console.error(`[telegram] sendMessage failed (attempt ${attempt}): HTTP ${res.status}`);
    } catch (error: unknown) {
      clearTimeout(timer);
      const message = error instanceof Error ? error.message : 'unknown error';
      console.error(`[telegram] sendMessage error (attempt ${attempt}): ${message}`);
    }
  }
  return false;
}
