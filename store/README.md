# Google Play listing images

Everything Play Console asks for under **Main store listing > Graphics**, for the `es-419` (default) and `en-US` listings. Ready to upload in `store/out/<listing>/`:

| File | Play Console field | Size |
| --- | --- | --- |
| `icon-512.png` | App icon | 512×512, 32-bit PNG |
| `feature-graphic.png` | Feature graphic | 1024×500, 24-bit PNG |
| `phone-1.png` … `phone-6.png` | Phone screenshots, in this order | 1080×1920 (9:16) |
| `tablet-1.png` … `tablet-4.png` | 7-inch **and** 10-inch tablet screenshots (same files) | 2560×1440 (16:9) |
| `alt-text.md` | Alt text for each image | |
| `contact-sheet.png` | Not for upload: everything on one page, for review | |

## Change a caption or alt text

Edit `store/captions.mjs`, then:

```sh
pnpm store:assets          # or: pnpm store:assets es-419
```

The script renders with the site's font, colors and logo, then checks every file against Play's rules (size, 9:16 / 16:9, alpha, file size, alt text length, 4 to 8 screenshots) and fails if one breaks them. It needs Playwright's Chromium once: `pnpm exec playwright install chromium`.

Play doesn't allow "best", "#1", "top", "new", "free", prices or calls to action ("download now") in any of these.

## Retake the app screenshots

The raw screens are in `store/shots/{phone,tablet}/{es,en}/`: phone at 390×844 @2x, tablet at 1280×720 @2x, Light theme, all from the same demo data so the numbers agree across images. To retake them after the app changes:

1. Run the API on `:8080` against an empty database and the app's web build on `:8081` (`EXPO_PUBLIC_API_URL=http://localhost:8080 npx expo export --platform web`, served with an index.html fallback).
2. `python3 store/capture/seed.py es` and `python3 store/capture/seed.py en` create the demo users (`demo-es@intenli.test`, `demo-en@intenli.test`) with accounts, boxes, transactions, debts and three spaces. Dates are fixed in November 2026; the activity screen reads "Hoy/Today" for 20 Nov, so change the dates if you retake on another day. Then mark both users verified (`update users set email_verified = true where email like 'demo-%'`).
3. `node store/capture/capture.mjs es store/shots/phone/es phone` (and `en`, and `tablet` into `store/shots/tablet/<lang>`).
4. `pnpm store:assets`.

`capture.mjs` widens the floating "Agregar" button before each shot: on web only, the Fab measures its label before the bold weight applies and cuts it to "Agreg…". Worth checking on a phone build too.
