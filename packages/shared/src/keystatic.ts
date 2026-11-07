import { collection, fields, singleton } from '@keystatic/core';

/**
 * Keystatic schema shared by both sites. Each app imports these pieces into its
 * own keystatic.config.ts, and content lives in that app's src/content folder.
 * Images are stored under the app's public/images folder.
 */

export const repo = 'windgate/keith-wine-sites' as const;

export const site = singleton({
  label: 'Site settings',
  path: 'src/content/site',
  format: { data: 'json' },
  schema: {
    brandName: fields.text({ label: 'Business name' }),
    pageTitle: fields.text({
      label: 'Browser tab / search result title',
      validation: { isRequired: true },
    }),
    description: fields.text({
      label: 'Search result description',
      multiline: true,
      description: 'About 150 characters. Also used when the site is shared on social media.',
    }),
    logo: fields.image({
      label: 'Logo',
      directory: 'public/images/brand',
      publicPath: '/images/brand/',
    }),
    shareImage: fields.image({
      label: 'Social sharing image',
      description: 'Shown when the site link is shared. 1200 x 630 pixels works best.',
      directory: 'public/images/brand',
      publicPath: '/images/brand/',
    }),
    siblingName: fields.text({ label: 'Footer: sister business name' }),
    siblingUrl: fields.url({ label: 'Footer: sister business web address' }),
  },
});

export const hero = singleton({
  label: 'Hero (top of page)',
  path: 'src/content/hero',
  format: { data: 'json' },
  schema: {
    heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
    tagline: fields.text({ label: 'Tagline', multiline: true }),
    image: fields.image({
      label: 'Hero image',
      directory: 'public/images/hero',
      publicPath: '/images/hero/',
    }),
    imageCaption: fields.text({ label: 'Image caption' }),
  },
});

export const about = singleton({
  label: 'About',
  path: 'src/content/about',
  format: { data: 'json' },
  schema: {
    heading: fields.text({ label: 'Section heading', validation: { isRequired: true } }),
    personName: fields.text({ label: 'Person name (optional)' }),
    personTitle: fields.text({ label: 'Person title (optional)' }),
    photo: fields.image({
      label: 'Photo',
      directory: 'public/images/about',
      publicPath: '/images/about/',
    }),
    background: fields.image({
      label: 'Section background image (optional)',
      description: 'Shown behind the text. Keep it light so the text stays readable.',
      directory: 'public/images/about',
      publicPath: '/images/about/',
    }),
    body: fields.text({
      label: 'Body',
      multiline: true,
      description: 'Leave a blank line between paragraphs.',
    }),
  },
});

export const wineSection = singleton({
  label: 'Wines section',
  path: 'src/content/wine-section',
  format: { data: 'json' },
  schema: {
    heading: fields.text({ label: 'Section heading', validation: { isRequired: true } }),
    intro: fields.text({
      label: 'Introduction (optional)',
      multiline: true,
      description: 'Leave a blank line between paragraphs.',
    }),
    background: fields.image({
      label: 'Section background image (optional)',
      description:
        'Shown behind the wines. Works best as light line art on a white background; keep the file under about 500 KB.',
      directory: 'public/images/wines',
      publicPath: '/images/wines/',
    }),
  },
});

export const alliesSection = singleton({
  label: 'Allies / partners section',
  path: 'src/content/allies-section',
  format: { data: 'json' },
  schema: {
    heading: fields.text({ label: 'Section heading' }),
    quote: fields.text({ label: 'Quote (optional)', multiline: true }),
    quoteAuthor: fields.text({ label: 'Quote author (optional)' }),
  },
});

export const contactSection = singleton({
  label: 'Contact section',
  path: 'src/content/contact-section',
  format: { data: 'json' },
  schema: {
    heading: fields.text({ label: 'Section heading', validation: { isRequired: true } }),
    intro: fields.text({ label: 'Introduction (optional)', multiline: true }),
    formHeading: fields.text({ label: 'Form heading' }),
    quote: fields.text({ label: 'Quote (optional)', multiline: true }),
    quoteAuthor: fields.text({ label: 'Quote author (optional)' }),
    people: fields.array(
      fields.object({
        name: fields.text({ label: 'Name' }),
        title: fields.text({ label: 'Title (optional)' }),
      }),
      {
        label: 'People listed',
        itemLabel: (props) => props.fields.name.value || 'Person',
      },
    ),
  },
});

export const wines = collection({
  label: 'Wines',
  path: 'src/content/wines/*',
  slugField: 'name',
  format: { data: 'json' },
  schema: {
    name: fields.slug({
      name: {
        label: 'Wine, as it should read on the site',
        description: 'Example: Inti Cava Brut, Requena, Spain',
        validation: { isRequired: true },
      },
    }),
    country: fields.text({ label: 'Country (optional)' }),
    image: fields.image({
      label: 'Bottle image',
      directory: 'public/images/wines',
      publicPath: '/images/wines/',
    }),
    order: fields.integer({
      label: 'Display order',
      description: 'Lower numbers appear first.',
      defaultValue: 100,
    }),
  },
});

export const allies = collection({
  label: 'Allies / partners',
  path: 'src/content/allies/*',
  slugField: 'name',
  format: { data: 'json' },
  schema: {
    name: fields.slug({
      name: { label: 'Name', validation: { isRequired: true } },
    }),
    url: fields.url({ label: 'Web address', validation: { isRequired: true } }),
    logo: fields.image({
      label: 'Logo',
      description: 'If there is no logo, the name is shown as a text link.',
      directory: 'public/images/allies',
      publicPath: '/images/allies/',
    }),
    order: fields.integer({
      label: 'Display order',
      description: 'Lower numbers appear first.',
      defaultValue: 100,
    }),
  },
});

export const sharedSingletons = {
  site,
  hero,
  about,
  wineSection,
  alliesSection,
  contactSection,
};

export const sharedCollections = { wines, allies };
