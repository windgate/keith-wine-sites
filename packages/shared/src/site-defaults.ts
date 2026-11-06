/**
 * Contact details shared by both sites, so the office line and address are
 * identical everywhere. Change them here once to update both sites.
 */
export const office = {
  addressLines: ['3835 Fort Bellingham Road', 'Bellingham, WA 98225'],
  phoneDisplay: '360.366.8228',
  phoneHref: 'tel:+13603668228',
  email: 'keith.johnsen@daqopa.com',
} as const;

export type NavLink = { label: string; href: string };
