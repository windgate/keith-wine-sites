# Keith's wine sites

Two one-page static sites built with Astro, sharing one codebase:

| Site | Folder | Domain |
| --- | --- | --- |
| Daqopa Brands | `apps/daqopa` | daqopa.com |
| Elevens Imports | `apps/elevens` | elevensimports.com |

Shared code lives in `packages/shared`: the page layout, components, styles, the Keystatic content schema, and the office address and phone number (`src/site-defaults.ts`). Fix something there once and both sites get it.

Each site is edited through [Keystatic](https://keystatic.com) at `/keystatic`, or by editing the JSON files in `src/content` directly. Edits are rare, so there is no database and no server: a saved edit becomes a GitHub commit, and Netlify rebuilds the site.

## Run it locally

Needs Node 22 (see `.nvmrc`).

```sh
npm install
npm run dev:daqopa     # http://localhost:4321
npm run dev:elevens
npm run build          # builds both sites
```

Locally, the editor at `/keystatic` reads and writes the files on disk.

## Where things are

```
apps/<site>/
  keystatic.config.ts     editor setup for this site
  netlify.toml            build command and the /index.php redirect
  src/pages/index.astro   the page: which sections, in what order
  src/content/            all editable text (JSON)
  public/images/          uploaded images (created on first upload)
packages/shared/src/
  components/             Nav, Hero, About, WineGrid, Allies, Contact, ...
  keystatic.ts            the editable fields
  site-defaults.ts        shared address and office phone
```

## Deploying on Netlify

Create **two** Netlify sites from this one repo, one per app:

1. Add new site > Import from GitHub > `windgate/keith-wine-sites`.
2. Set **Base directory** to `apps/daqopa` (or `apps/elevens`). The build command comes from that folder's `netlify.toml`.
3. Deploy, then check the `*.netlify.app` preview before touching DNS.

### Contact form

The form is a Netlify Form, so there is no backend. Both forms must be sent to **keith.johnsen@daqopa.com** until told otherwise. That is set in the Netlify dashboard, not in the code:

Site > Forms > Form notifications > Add notification > Email notification. Do this for each site (`daqopa-contact` and `elevens-contact`). Then send a test message from each live preview.

### Turning on the editor in production

1. Open `https://<the-site>/keystatic` on the deployed site. Keystatic walks you through creating a GitHub App for this repo.
2. Copy the values it shows into Netlify under Site configuration > Environment variables (names are in `.env.example`), then redeploy.
3. Add the webmaster as a collaborator on the GitHub repo so they can sign in.

### Moving the domains

Both domains are at GoDaddy. See the migration plan for the full steps. In short: lower the TTL, add the custom domain in Netlify, change only the apex A record and the `www` CNAME, and leave MX and TXT records alone so email keeps working.

## Status

Checked here: both sites build, the generated pages contain the migrated content, the form markup, the redirects configuration and metadata, and the Keystatic editor loads in local mode.

**Not checked yet** (needs the real Netlify and GitHub accounts):

- A deploy on Netlify, including the base-directory setup.
- The Keystatic editor in GitHub mode (`pathPrefix` for the two apps in one repo is set but untested).
- Form delivery to Keith's inbox.

## Still needed from the live sites

The live Joomla sites could only be read as text, so these are not in the repo yet:

- **Images:** logos, Keith's headshot, the Elevens hero photo (Albea vineyards), ally logos, and bottle shots. Upload them in the editor, or drop files into `public/images/...`. Until then the pages show text-only versions. Resize large photos before uploading (about 1600 px wide for heroes, 800 px for bottles); images are not auto-optimized.
- **Brand colors and fonts:** the colors are placeholders (burgundy for Daqopa, blue for Elevens) in each `src/pages/index.astro`, and the font is a system serif. Replace them with the real brand styling.
- **Elevens sales figures:** the live page animates its numbers, so the bottle counts could not be read. They are left blank in `apps/elevens/src/content/sales.json` (the page lists the countries only). Fill them in once Keith approves what to publish.

## Content notes

Copy was moved over as published, with these deliberate changes:

- Daqopa's launch year is **2007** on both sites (the old Daqopa page said 2008). Its "17 years later" line now says **19 years**; it ages, so consider rewording.
- The phone number is the shared office line on both sites. Individual cell numbers are no longer shown, and the Elevens page does not show an email address, as before.
- The partner strip no longer includes the sister site; a footer line links to it instead.
- The template leftovers are gone: the footer "Your Company" text, the stray offcanvas message, and the RapidSSL badge.

Left as published, so Keith may want to correct them: "of the what started" in the Daqopa About text, "Pay's d'Oc" and the missing accents in some wine names, and the Elevens hero label "Scouts".
