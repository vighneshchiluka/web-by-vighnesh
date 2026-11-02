# Web by Vighnesh

React + JavaScript, custom CSS, build-time HTML rendering and a small esbuild bundle. No backend or database is required. All 8 services have distinct, crawlable pages. All primary copy is available without JavaScript; the form and filters require it.

## Run locally

Requires Node.js 20+ and npm.

```sh
npm install
npm run build
npm test
npm run dev
```

Open http://localhost:4173. Rebuild after source edits; the preview serves the built output.

## Before accepting enquiries

Edit `src/config.js`:

- `site.email`: real business email; enables the enquiry email draft flow.
- `site.whatsapp`: actual number in international digits, without + or spaces; enables prominent floating WhatsApp and contact links.
- `site.formEndpoint`: optional HTTPS form service endpoint accepting JSON. Use a provider that supports cross-origin requests from your domain. Keep private credentials on a server, never in this file. A success response must indicate actual provider acceptance; add spam protection and rate limits with the provider before public launch.
- `site.url`: final public origin. Rebuild to regenerate all canonical URLs and sitemap entries.
- Project data: supply verified screenshots, descriptions, stacks and live URLs. Six visible projects use images, stacks and live links sourced from the supplied personal portfolio. Unverified potential projects remain in configuration and are excluded from the public grid. The hero remains an explicitly illustrative CSS design study. Empty categories intentionally show an honest empty state.
- Package features and delivery windows are editable proposals. Confirm you can honour them before publishing publicly.

Without contact setup, the form validates locally and offers a downloadable enquiry. It never claims a message has been sent. With email configured, it opens a mail draft and tells the user to press Send. With an endpoint configured, it POSTs and handles both success and error responses. The endpoint must validate on the server too. No form content is saved in browser storage.

## Design system

Palette: charcoal #171917, warm gold #D5B46A, off-white #F8F8F6, sage-tinted supporting surfaces. Manrope for headings and wordmark, DM Sans for body, Georgia italic for editorial emphasis. Fonts use display=swap and system fallbacks. Wordmark is accessible text; brand.svg is the favicon and og.svg is the editable social card. For broad social-platform compatibility, export og.svg as a 1200×630 PNG and update the build script's image URLs.

Responsive layouts switch at 1100px and 760px. Navigation, project filters, detail dialogs, service enquiry presets, validation and reduced-motion support are implemented. Project previews are local WebP images with explicit dimensions and lazy loading. The illustrative hero artwork is CSS.

## Deployment

### Netlify
Import this folder's repository. `netlify.toml` sets `npm run build` and `dist`. There is no SPA catch-all: service pages are real directories with index.html. Set a custom domain, update `site.url`, and rebuild. Do not reuse the earlier personal portfolio URL unless you intentionally want to replace that site.

### Other static hosting
Build and upload `dist/` to a host with directory index support. Configure `404.html` as the 404 response. The `.openai/hosting.json` is for the separate Sites preview and does not affect Netlify.

### SEO launch
Metadata, canonical links, Open Graph, descriptive service URLs, sitemap.xml, robots.txt and ProfessionalService JSON-LD are generated at build time. No invented ratings, street address or testimonials are included. The stated Mumbai locality is used without claiming a public office. Review structured data eligibility for your actual business; submit the public sitemap in Google Search Console after verifying domain ownership. Owner-private preview hosting is not a public SEO launch. Add your Search Console verification via your DNS provider or a verification file in dist as instructed by Google. Add real project images with descriptive alt text, local business details and original case studies when available.

## Verification
`npm test` covers validation, contact-link construction, server-rendered H1s, unique titles, canonicals and sitemap coverage. Visual browser checks are recorded separately in the delivery report. No guaranteed search ranking or Lighthouse score is claimed.


## Current theme
The default theme is dark. Source overrides are in src/dark.css and are combined after the base stylesheet during build. Colours use charcoal #111312, ivory #F0EEE7 and gold #D5B46A.
