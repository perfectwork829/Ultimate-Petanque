# Deploy static site (ultimatepetanque.app)

Upload the entire `public/` folder to your host. Required files:

```
public/
  index.html
  privacy-policy.html
  terms-of-service.html
  styles/site.css
  js/site.js
  assets/logo.png          ← copy from app assets (see below)
```

## Logo

Copy the app logo into `public/assets/logo.png`:

```bash
mkdir -p public/assets
cp assets/images/logo-ultimate-petanque.png public/assets/logo.png
```

If the file is missing, the site shows a fallback icon.

## URLs for Google OAuth / Play Store

| Page | URL |
|------|-----|
| Home | `https://ultimatepetanque.app/` |
| Privacy | `https://ultimatepetanque.app/privacy-policy.html` |
| Terms | `https://ultimatepetanque.app/terms-of-service.html` |

## Quick deploy options

### Cloudflare Pages
1. Connect repo or upload `public/` as project root.
2. Build command: *(none)*  
3. Output directory: `public`

### Netlify
Drag-and-drop the `public` folder, or set publish directory to `public`.

### Vercel
Set **Root Directory** to `public` for a static deployment.

## Local preview

```bash
cd public
npx --yes serve .
# Open the URL shown (e.g. http://localhost:3000)
```

**Important:** Upload the whole `public/` folder (including `styles/`, `js/`, `assets/`). If only `index.html` is uploaded, the page looks blank/white because CSS never loads.

Paths are **relative** (`styles/site.css`) so the site works on any host. At domain root you can also use `https://ultimatepetanque.app/` as home.

## Blank white page?

1. Browser DevTools → **Network** → reload → check `site.css` returns **200** (not 404).
2. Confirm folder structure on the server matches the list above.
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac).
