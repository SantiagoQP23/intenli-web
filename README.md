# intenli.com

The Intenli company website. Today it holds the Intenli Money pages that the app stores link to.

| Page | Spanish (default) | English |
| --- | --- | --- |
| Company home | `/` | `/en` |
| Intenli Money landing | `/money` | `/en/money` |
| Privacy Policy | `/money/privacy` | `/en/money/privacy` |
| Terms and Conditions | `/money/terms` | `/en/money/terms` |
| Delete account (request) | `/money/delete-account` | `/en/money/delete-account` |
| Delete account (confirm, from the email) | `/money/delete-account/confirm` | `/en/money/delete-account/confirm` |

**Don't rename these URLs**: Google Play and the App Store point at the privacy, terms and delete-account pages. `pnpm check:links` fails the build if one disappears.

## Stack

[Astro](https://astro.build) (static output) and Tailwind CSS 4. The colors, font (Plus Jakarta Sans) and radii are copied from `@intenli/ui`'s DESIGN.md into `src/styles/global.css`; dark mode follows the system. The logo SVGs come from the app (`intenli-money-app/assets/brand`).

- `src/i18n/ui.ts`: every UI string in Spanish and English.
- `src/views/`: one component per page, used by the thin files in `src/pages/` (Spanish) and `src/pages/en/` (English).
- `src/content/legal/{es,en}/{privacy,terms}.md`: the legal texts. Change the `updated` date in the front matter when you edit them.
- `public/screens/{es,en}/`: app screenshots for the landing page.
- `store/`: Google Play listing images (icon, feature graphic, screenshots) and the script that makes them. See [store/README.md](store/README.md).

## Run

```sh
pnpm install
cp .env.example .env   # point PUBLIC_MONEY_API_URL at a running API
pnpm dev               # http://localhost:4321
pnpm check && pnpm build && pnpm check:links
```

| Variable | What |
| --- | --- |
| `PUBLIC_MONEY_API_URL` | Intenli Money API base URL, e.g. `https://api.intenli.com`. The delete-account pages call it from the browser |
| `PUBLIC_PLAY_TESTING_URL` | Google Play testing invite. Empty shows "Coming soon" instead of the button |

## Deploy (Vercel)

1. Import this repository in Vercel. It detects Astro; no adapter is needed.
2. Set `PUBLIC_MONEY_API_URL` (and `PUBLIC_PLAY_TESTING_URL` when you have it) for Production and Preview.
3. Add the `intenli.com` domain (and `www.intenli.com`, redirecting to it).
4. On the API (Railway), add `https://intenli.com` to `CORS_ALLOWED_ORIGINS`, set `MAIL_API_KEY` (Resend) and `WEB_BASE_URL=https://intenli.com`, and verify `intenli.com` in Resend with its DNS records.

`vercel.json` turns on clean URLs (`/money/privacy` serves `money/privacy.html`) and sends no referrer from the confirm page, so the deletion token never leaks.

## Account deletion

1. `/money/delete-account` posts the email to `POST /v1/account-deletion/requests`. The answer is the same whether or not an account exists.
2. The API emails a link to `/money/delete-account/confirm?token=…`, valid 30 minutes, once.
3. The confirm page moves the token out of the address bar, loads `POST /v1/account-deletion/preview` (what happens to each space), and after the checkbox calls `POST /v1/account-deletion/confirm`.

The rules (what's deleted, what stays, who becomes owner) are in the backend README.

## Store forms

**Google Play, Data safety**

| Question | Answer |
| --- | --- |
| Collects data | Yes: email address, name (Personal info); financial info the user enters ("Other financial info"); user IDs |
| Shared with third parties | No (service providers don't count as sharing) |
| Encrypted in transit | Yes |
| Users can request deletion | Yes, in the app and at `https://intenli.com/money/delete-account` |
| Purpose | App functionality, account management |
| Ads / analytics | None |

**App Store, App Privacy**

| Data type | Linked to the user | Used for tracking | Purpose |
| --- | --- | --- | --- |
| Contact Info: Email Address, Name | Yes | No | App Functionality |
| Financial Info: Other Financial Info | Yes | No | App Functionality |
| Identifiers: User ID | Yes | No | App Functionality |

Privacy Policy URL: `https://intenli.com/money/privacy` · Account deletion: in the app (More → Delete account).
