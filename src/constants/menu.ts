export const dataMenu = [
  {
    path: '/',
    name: 'Home',
    short_name: 'Home',
    ref: 'home',
    icon: 'home',
  },
  {
    name: 'Manage Reviews',
    short_name: 'Manage',
    ref: 'manage',
    icon: 'folder',
    children: [
      { path: '/manage-reviews', name: 'Moderate Content' },
      { path: '/settings', name: 'Settings' },
    ],
  },
  {
    name: 'Collect Reviews',
    short_name: 'Collect',
    ref: 'collect',
    icon: 'star',
    children: [
      { path: '/sub-1', name: 'Sub 1' },
      { path: '/sub-2', name: 'Sub 2' },
      { path: '/sub-3', name: 'Sub 3' },
    ],
  },
  {
    name: 'Import',
    short_name: 'Import',
    ref: 'import',
    icon: 'paper-plane',
    children: [
      { path: '/all-reviews', name: 'All Reviews' },
      { path: '/all-reviews-2', name: 'All Reviews 2' },
    ],
  },
  {
    name: 'Display Reviews',
    short_name: 'Display',
    ref: 'display',
    icon: 'poll',
    children: [
      { path: '/main-widget', name: 'Main Widget' },
      { path: '/more-widgets', name: 'More Widgets' },
      { path: '/customize-text', name: 'Customize Text' },
    ],
  },
  {
    path: '/analytics',
    name: 'Analytics',
    short_name: 'Analytics',
    ref: 'analytics',
    icon: 'chart-line',
    children: [],
  },
  { path: '/integration', name: 'Integration ', short_name: 'Integration', ref: 'integration', icon: 'bullhorn' },
];
