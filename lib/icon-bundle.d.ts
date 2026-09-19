// The type of lib/icon-bundle.js, which scripts/build-icons.mjs generates.
// Declared by hand so type-checking neither needs that file nor parses it.
import type { IconifyJSON } from '@iconify/react/offline';

declare const bundle: IconifyJSON[];
export default bundle;
