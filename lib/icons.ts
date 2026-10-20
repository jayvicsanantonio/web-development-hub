// The icon component the site renders with. It registers the bundle that
// scripts/build-icons.mjs writes, so every icon in use renders from the build -
// into the static HTML and on the client - with no request to Iconify's API.
// A client module, so a server component can render an icon too: it gets a
// reference to this one, whose registration then runs where the icon renders.
'use client';

import { addCollection } from '@iconify/react/offline';
import bundle from './icon-bundle';

for (const iconSet of bundle) {
  addCollection(iconSet);
}

export { Icon } from '@iconify/react/offline';
