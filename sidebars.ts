import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Workshop Framework',
      items: [
        'workshop-framework/overview',
        'workshop-framework/learning-model',
      ],
    },
    {
      type: 'category',
      label: 'For Educators & Sponsors',
      items: [
        'for-educators/sponsorship-guide',
        'for-educators/alignment',
      ],
    },
    {
      type: 'category',
      label: 'Research & Outcomes',
      items: [
        'research/cognitive-models',
      ],
    },
  ],
};

export default sidebars;
