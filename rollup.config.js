/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import resolve from 'rollup-plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import multiInput from 'rollup-plugin-multi-input';

export default {
  input: './src/**/*.js',
  output: {
    dir: '../../../dist/web-components',
    format: 'esm',
    sourcemap: true,
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  treeshake: true,
  plugins: [
    multiInput(),
    replace({
      preventAssignment: true,
    }),
    babel(),
    resolve(),
  ]
}
