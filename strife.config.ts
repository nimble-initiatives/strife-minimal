import { defineConfig, glob } from '@strifeapp/strife/schema';

// Schema-as-code: every type under ./schemas is your content model. `strife push`
// turns these into backend templates + a content index; `strife typegen generate`
// turns them into TypeScript types under .strife/.
export default defineConfig({
  schema: glob('./schemas/**/*.ts'),
});
