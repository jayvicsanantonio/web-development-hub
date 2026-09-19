// The icon component the site renders with. It registers the bundle that
// scripts/build-icons.mjs writes, so every icon in use renders from the build -
// into the static HTML and on the client - with no request to Iconify's API.
import { addCollection } from '@iconify/react/offline';
import bundle from './icon-bundle';

for (const iconSet of bundle) {
  addCollection(iconSet);
}

export { Icon } from '@iconify/react/offline';
