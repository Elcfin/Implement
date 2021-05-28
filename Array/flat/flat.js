console.log("flat");

/* 数组扁平化flat方法 Array.prototype.flat()*/

/* 
 * 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
 * flat()方法会移除数组中的空项
 * 使用 Infinity，可展开任意深度的嵌套数组
 */

/* 
 * 将数组的元素展开一层 
 * - 扩展运算符 + concat
 *   - [].concat(...arr)
 * 
 * - apply + concat
 *   - [].concat.apply([], arr)
 */

/* ES5实现 */
const myFlat01 = Symbol('myFlat01');

Array.prototype[myFlat01] = function (depth = 1) {
  if (depth < 1) return this;
  let arr = [];
  this.forEach((item) => {
    if (Array.isArray(item) && temp) {
      let temp = depth;
      arr = arr.concat(item[myFlat01](--temp));
    } else {
      arr.push(item);
    }
  });
  return arr;
}

/* ES6实现 */
/* Generator */
const myFlat02 = Symbol('myFlat02');

Array.prototype[myFlat02] = function (depth = 1) {
  if (depth < 1) return this;
  let arr = [];
  return arr;
}

/* reduce实现 */
const myFlat03 = Symbol('myFlat03');

Array.prototype[myFlat03] = function (depth = 1) {
  return depth < 1 ? this : this.reduce(
    (pre, cur) => {
      let temp = depth;
      pre = Array.isArray(pre) ? pre : [pre];
      return pre.concat(Array.isArray(cur) && temp > 1 ? cur[myFlat03](--temp) : cur);
    }
  );
}

const values = [1, [2, [3, [4]]], 5, [3, [4]], 5];