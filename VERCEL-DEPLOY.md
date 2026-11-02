# Deploy Web by Vighnesh to Vercel

This is React source with build-time HTML rendering, not a Next.js or Vite project. The included vercel.json sets the correct build automatically.

1. Extract web-by-vighnesh-vercel-source.zip.
2. Put the extracted files in a GitHub repository. package.json and vercel.json must be at the repository root, alongside src, scripts and public.
3. Open https://vercel.com/new, connect GitHub and import the repository.
4. Use Framework Preset: Other; Build Command: npm run build; Output Directory: dist; Install Command: npm ci. Root Directory is the folder containing package.json.
5. Deploy. Vercel installs dependencies and builds the React project.
6. Open the provided vercel.app URL. Check homepage, service pages, project dialogs and contact links.
7. Set site.url in src/config.js to your final Vercel origin or custom domain, without a trailing slash, then commit and redeploy. This updates canonical links, sitemap and structured data. Keep it pointing to your custom domain once you add one.

The email CTA opens an email draft; it does not send automatically. No environment variables are required for the current static site. Do not add an SPA catch-all rewrite: service pages are real HTML directories. Never upload node_modules or the .openai folder.

Optional local deployment from this extracted source folder, with Node.js installed:

```sh
npx vercel
```

Follow the login and project prompts. To publish production afterwards:

```sh
npx vercel --prod
```
