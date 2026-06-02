import { defineType, fields } from '@strifeapp/strife/schema';

// The home page. `strife push` turns this into a backend "Pages" template, and the
// CLI seeds one published Home document at slug "/" so the site renders straight
// away. Edit the content in your Strife studio; the fields here define its shape.
export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  collection: 'Pages',
  fields: {
    heading: fields.text({ label: 'Heading', localizable: true }),
    body: fields.html({ label: 'Body', localizable: true }),
    image: fields.image({ label: 'Hero image' }),
  },
});
