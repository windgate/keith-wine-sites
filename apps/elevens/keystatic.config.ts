import { config, fields, singleton } from '@keystatic/core';
import { repo, sharedCollections, sharedSingletons } from '@keith/shared/keystatic';

// Elevens Imports only: the "sales by country" figures.
const sales = singleton({
  label: 'Sales by country',
  path: 'src/content/sales',
  format: { data: 'json' },
  schema: {
    heading: fields.text({ label: 'Section heading', validation: { isRequired: true } }),
    rows: fields.array(
      fields.object({
        country: fields.text({ label: 'Country', validation: { isRequired: true } }),
        bottles: fields.integer({
          label: 'Bottles sold',
          description: 'Leave empty until the figure is approved for publishing.',
        }),
      }),
      {
        label: 'Countries',
        itemLabel: (props) => props.fields.country.value || 'Country',
      },
    ),
  },
});

export default config({
  // Editing locally during development; editing through GitHub in production.
  storage: import.meta.env.PROD
    ? { kind: 'github', repo, pathPrefix: 'apps/elevens' }
    : { kind: 'local' },
  ui: { brand: { name: 'Elevens Imports' } },
  singletons: { ...sharedSingletons, sales },
  collections: sharedCollections,
});
