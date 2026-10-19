# Search Console export

`npm run gsc:export` pulls Search Console data with a service account and
writes a dated folder under `seo-data/gsc/` (gitignored): raw CSVs for every
pull, `meta.json` with the property, windows and row counts, and `summary.md`
comparing the last 28 days with the previous 28 and the same days a year ago,
plus an opportunity list (low CTR, positions 4–20, top 3, cannibalization).

## One-time setup

1. In Google Cloud Console, pick or create a project and enable the
   **Google Search Console API**.
2. Create a **service account** (no roles needed) and add a **JSON key**.
3. In Search Console, open the property for the site → Settings → Users and
   permissions → Add user: the service account's `client_email`, permission
   **Restricted** (read-only is all the export needs).
4. Base64-encode the key (`base64 -w0 key.json`) and provide it as the
   environment variable `GOOGLE_SA_JSON` — in a secret store or CI secret,
   never in this repository, a `.env` file that is committed, or a chat.
5. `npm run gsc:sites` should list the property. If more than one matches the
   host, set `GSC_SITE_URL` (for example `sc-domain:<domain>`).
6. The opportunity lists skip queries under 50 impressions in the last 28 days.
   While the site is young, set `GSC_MIN_IMPRESSIONS` lower (for example `5`).

## Weekly cycle

```bash
npm run gsc:export    # search analytics → seo-data/gsc/<today>/
npm run gsc:inspect   # index status of every live sitemap URL → same folder
npm run gsc:compare   # the two newest folders → compare.md in the newer one
```

`gsc:compare` reads only saved files, so it needs no key. It compares the
last 7 complete days with the 7 before (two weekly 28-day windows overlap by
21 days, so their totals barely move), pages and queries across the newer
pull's two 28-day windows, queries new since the older pull, and which
sitemap URLs entered or left the index. URL Inspection allows about 2,000
calls a day per property, enough for one full pass a day.

## Limits worth knowing

- The most recent two to three days are incomplete; the windows end three
  days before today.
- The API omits anonymized queries, so query rows sum to less than the chart.
- Search Console keeps about sixteen months; the daily pull asks for all of it.
