import { config } from '@keystatic/core';
import { repo, sharedCollections, sharedSingletons } from '@keith/shared/keystatic';

export default config({
  // Editing locally during development; editing through GitHub in production.
  storage: import.meta.env.PROD
    ? { kind: 'github', repo, pathPrefix: 'apps/daqopa' }
    : { kind: 'local' },
  ui: { brand: { name: 'Daqopa Brands' } },
  singletons: sharedSingletons,
  collections: sharedCollections,
});
