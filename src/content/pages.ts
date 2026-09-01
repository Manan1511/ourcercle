/**
 * Per-page copy. Placeholder text throughout -- replace once the client's
 * final wording is signed off.
 */

export interface PageMeta {
  title: string
  description: string
  /** Use `title` verbatim rather than appending the brand name. */
  absoluteTitle?: boolean
}

export interface Section {
  heading: string
  body: string
}

export interface PageContent {
  meta: PageMeta
  hero: {
    eyebrow?: string
    heading: string
    body: string
    cta?: { label: string; href: string }
  }
  sections: Section[]
}

export const home: PageContent = {
  meta: {
    // Home owns its whole title -- appending the brand would repeat it.
    title: 'Cercle',
    absoluteTitle: true,
    description:
      'Placeholder home page description for search results and social previews.',
  },
  hero: {
    eyebrow: 'Placeholder eyebrow',
    heading: 'Headline goes here',
    body: 'Supporting paragraph. This copy is a placeholder and should be replaced with the client-approved wording.',
    cta: { label: 'Get in touch', href: '/contact' },
  },
  sections: [
    {
      heading: 'Section one',
      body: 'Placeholder body copy for the first content section.',
    },
    {
      heading: 'Section two',
      body: 'Placeholder body copy for the second content section.',
    },
  ],
}

export const about: PageContent = {
  meta: {
    title: 'About',
    description: 'Placeholder about page description.',
  },
  hero: {
    heading: 'About us',
    body: 'Placeholder introduction to the company and what it does.',
  },
  sections: [
    { heading: 'Our story', body: 'Placeholder story copy.' },
    { heading: 'Our approach', body: 'Placeholder approach copy.' },
  ],
}

export const services: PageContent = {
  meta: {
    title: 'Services',
    description: 'Placeholder services page description.',
  },
  hero: {
    heading: 'What we do',
    body: 'Placeholder overview of the services offered.',
  },
  sections: [
    { heading: 'Service one', body: 'Placeholder service description.' },
    { heading: 'Service two', body: 'Placeholder service description.' },
    { heading: 'Service three', body: 'Placeholder service description.' },
  ],
}

export const contact: PageContent = {
  meta: {
    title: 'Contact',
    description: 'Placeholder contact page description.',
  },
  hero: {
    heading: 'Get in touch',
    body: 'Placeholder contact copy. No form is wired up yet -- see the README.',
  },
  sections: [],
}
