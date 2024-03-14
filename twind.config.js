import { defineConfig } from '@twind/core';
import presetAutoprefix from '@twind/preset-autoprefix';
import presetTailwind from '@twind/preset-tailwind';

export default defineConfig({
  hash: false,
  presets: [presetAutoprefix(), presetTailwind()],
  extend: {
    fontFamily: {
      sans: [' Arial', 'Arial Rounded MT'],
    },
  }
});