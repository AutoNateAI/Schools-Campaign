import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'AutoNateAI',
  tagline: 'Empowering Students to Think Critically in the AI Age',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://schools.autonateai.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domains, this should be '/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AutoNateAI', // Usually your GitHub org/user name.
  projectName: 'Schools-Campaign', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Social card for link previews
    image: 'img/social-card.svg',
    metadata: [
      {name: 'description', content: 'AutoNateAI teaches students critical thinking and AI literacy through a 2-hour interactive workshop plus 12 months of guided learning. Empower your district with future-ready skills.'},
      {name: 'keywords', content: 'critical thinking, AI literacy, education, student workshops, metacognition, school districts, educational innovation'},
      {property: 'og:title', content: 'AutoNateAI - Critical Thinking for the AI Age'},
      {property: 'og:description', content: 'Transform how students learn, reflect, and reason with our 2-hour workshop + year-long AI-guided learning portal.'},
      {property: 'og:type', content: 'website'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'AutoNateAI - Critical Thinking for the AI Age'},
      {name: 'twitter:description', content: 'Empower students to think critically in the age of AI. 2-hour workshop + 12 months of support.'},
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'AutoNateAI',
      logo: {
        alt: 'AutoNateAI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Program Overview',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Become a Sponsor',
          position: 'left',
          items: [
            {
              label: 'School Districts',
              to: '/sponsors/school-districts',
            },
            {
              label: 'Local Businesses',
              to: '/sponsors/local-businesses',
            },
            {
              label: 'Churches',
              to: '/sponsors/churches',
            },
          ],
        },
        {
          to: '/students',
          label: 'Students',
          position: 'left',
        },
        {
          to: '/contact',
          label: 'Contact',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn More',
          items: [
            {
              label: 'Program Overview',
              to: '/docs/',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'Contact',
              to: '/contact',
            },
            {
              label: 'Schedule a Call',
              to: '/contact',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Privacy Policy',
              to: '/privacy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} AutoNateAI. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
