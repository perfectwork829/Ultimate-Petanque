# Deploy Ultimate Petanque site on Cloudflare Pages

This guide deploys the static pages in `public/`:

- **Home** → `index.html`
- **Privacy** → `privacy-policy.html`
- **Terms** → `terms-of-service.html`

Target URLs (after domain is connected):

| Page    | URL |
|---------|-----|
| Home    | `https://ultimatepetanque.app/` |
| Privacy | `https://ultimatepetanque.app/privacy-policy.html` |
| Terms   | `https://ultimatepetanque.app/terms-of-service.html` |

---

## Before you start

### 1. Copy the logo (optional but recommended)

From the project root (PowerShell):

```powershell
New-Item -ItemType Directory -Force -Path public\assets
Copy-Item assets\images\logo-ultimate-petanque.png public\assets\logo.png
```

### 2. Confirm these files exist

```
public/
  index.html
  privacy-policy.html
  terms-of-service.html
  styles/site.css
  js/site.js
  assets/logo.png
```

### 3. Test locally (optional)

```powershell
cd public
npx --yes serve .
```

Open the URL shown in the terminal. You should see the home page with blue header and content (not a blank white page).

---

## Part A — Deploy with Cloudflare Pages (recommended)

You can use **Git** (auto-deploy on push) or **direct upload** (no Git).

### Option 1: GitHub / GitLab (best for updates)

1. **Push your repo** to GitHub (if not already).
2. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize GitHub and select the **Ultimate.Petanque.app** repository.
4. **Build settings:**

   | Setting | Value |
   |---------|--------|
   | Production branch | `main` (or your default branch) |
   | Framework preset | **None** |
   | Build command | *(leave empty)* |
   | Build output directory | **`public`** |

5. Click **Save and Deploy**.
6. Wait ~1 minute. Cloudflare gives you a URL like `https://ultimate-petanque.pages.dev`.
7. Open that URL → you should see the home page.

**Later updates:** push changes to `public/` → Cloudflare redeploys automatically.

---

### Option 2: Direct upload (no Git)

1. Dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Drag the entire **`public`** folder contents into the upload area  
   (or zip the `public` folder and upload the zip).
3. Project name: e.g. `ultimate-petanque`.
4. Deploy. Open the `*.pages.dev` URL to verify.

**Updates:** upload again or switch to Git (Option 1).

---

## Part B — Connect your domain `ultimatepetanque.app`

Do this after Pages deploy works on `*.pages.dev`.

### If you bought the domain on Cloudflare Registrar

1. **Workers & Pages** → your project → **Custom domains** → **Set up a custom domain**.
2. Enter: `ultimatepetanque.app`
3. Also add: `www.ultimatepetanque.app` (optional; redirect www → apex is recommended).
4. Cloudflare creates DNS records automatically. Wait a few minutes for SSL (HTTPS).

### If the domain is registered elsewhere (GoDaddy, Namecheap, etc.)

1. **Move DNS to Cloudflare** (free):
   - Cloudflare → **Add a site** → enter `ultimatepetanque.app`.
   - Cloudflare shows two nameservers (e.g. `ada.ns.cloudflare.com`).
   - At your registrar, replace nameservers with Cloudflare’s.
   - Wait up to 24–48 hours (often much faster).

2. In **Pages** → your project → **Custom domains** → add `ultimatepetanque.app`.

3. Cloudflare will show the DNS records to add if needed (usually automatic once the zone is on Cloudflare).

### Verify HTTPS

Open:

- `https://ultimatepetanque.app/`
- `https://ultimatepetanque.app/privacy-policy.html`
- `https://ultimatepetanque.app/terms-of-service.html`

All three should load with the styled layout.

---

## Part C — Use these URLs in Google OAuth

In [Google Cloud Console](https://console.cloud.google.com/) → **Branding** → **Domaine de l'application**:

| Field | URL |
|--------|-----|
| Page d'accueil | `https://ultimatepetanque.app/` |
| Politique de confidentialité | `https://ultimatepetanque.app/privacy-policy.html` |
| Conditions d'utilisation | `https://ultimatepetanque.app/terms-of-service.html` |

**Domaines autorisés:** add `ultimatepetanque.app` (and keep `supabase.co` + your Supabase project subdomain for OAuth).

---

## Troubleshooting

### Blank white page

- You deployed only `index.html`, not the full `public/` folder.
- Fix: redeploy with `styles/`, `js/`, and `assets/` included.
- In browser: F12 → **Network** → reload → `site.css` must be **200**.

### 404 on CSS or JS

- Build output directory must be **`public`**, not `/` (repo root).
- Files must live at `public/styles/site.css`, not nested wrongly.

### Domain shows “Coming Soon” or old page

- DNS still propagating — wait up to a few hours.
- Clear browser cache or try incognito.
- In Pages → **Custom domains**, check status is **Active**.

### `www` does not work

- Add `www.ultimatepetanque.app` as custom domain, or set a **Redirect rule** (Cloudflare → Rules) from `www` to apex.

---

## Optional: clean URLs without `.html`

Cloudflare Pages supports a `_redirects` file in the publish folder. To add later, create `public/_redirects`:

```
/privacy-policy    /privacy-policy.html   200
/terms             /terms-of-service.html 200
```

Then Google can use `https://ultimatepetanque.app/privacy-policy` if you prefer (optional).

---

## Checklist

- [ ] Logo copied to `public/assets/logo.png`
- [ ] Local test with `npx serve` OK
- [ ] Cloudflare Pages project created (Git or upload)
- [ ] Build output directory = **`public`**
- [ ] `*.pages.dev` URL shows home page
- [ ] Custom domain `ultimatepetanque.app` connected
- [ ] HTTPS works on home, privacy, terms
- [ ] Google OAuth / Play Store URLs updated
