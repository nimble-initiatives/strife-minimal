import { defineConfig, glob } from '@strifeapp/strife/schema';

// Schema-as-code: every type under ./schemas is your content model. `strife push`
// turns these into backend templates + a content index; `strife typegen generate`
// turns them into TypeScript types under .strife/.
export default defineConfig({
  schema: glob('./schemas/**/*.ts'),

  // Optional: declare your locales here and `strife push` writes them to the
  // team's `Configurations/Localization` (a silent full replace — removing a
  // locale here removes it from your published content's per-locale output).
  // Locale codes must match the codes your content is keyed by ([a-z]{2}(-[A-Z]{2})?).
  //
  // localization: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'sv'],
  //   fallbackToPrimary: true,
  // },
});
