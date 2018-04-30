/*
 * Copyright 2018 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'require base';
'require es6/util/isobject';
'require es6/util/makeiterator';

/**
 * Map/WeakMap constructor helper.
 *
 * @param {!Map<KEY, VALUE>|!WeakMap<KEY, VALUE>} map
 * @param {!Iterable<!Array<KEY|VALUE>>|!Array<!Array<KEY|VALUE>>|null=}
 *     opt_iterable Optional data to populate the map.
 * @template KEY, VALUE
 */
$jscomp.mapConstructor = function(map, opt_iterable) {
  if (opt_iterable) {
    var iter = $jscomp.makeIterator(opt_iterable);
    /** @type {IIterableResult<!Array<KEY|VALUE>>} */
    var entry;
    while (!(entry = iter.next()).done) {
      var item = entry.value;
      if (!$jscomp.isObject(item)) {
        if (iter['return'] !== undefined) {
          iter['return']();
        }
        throw new TypeError('Iterator value ' + item + ' is not an object.');
      }
      try {
        map.set(/** @type {KEY} */ (item[0]), /** @type {VALUE} */ (item[1]));
      } catch (e) {
        if (iter['return'] !== undefined) {
          iter['return']();
        }
        throw e;
      }
    }
  }
};
