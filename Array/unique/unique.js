console.log("unique");

/* 数组去重 */

/* ES6实现 */
/* 基于set */
/* 不修改数组本身 */
const unique01 = Symbol('unique01');

Array.prototype[unique01] = function () {
  /* const set = new Set(this);
  return Array.from(set); */
  return [...new Set(this)];
}

/* 基于对象 */
/* key始终唯一 */
/* 数组中的对象元素统一转化为“[object Object]” */
/* 不修改数组本身 */
const unique02 = Symbol('unique02');

Array.prototype[unique02] = function () {
  const obj = {};
  for (let i = 0; i < this.length; i++) {
    obj[this[i]] = true;
  }

  const arr = [];
  for (const key in obj) {
    arr.push(key);
  }

  return arr;
}

/* 基于排序 */
/* 不修改数组本身 */
const unique03 = Symbol('unique03');

Array.prototype[unique03] = function () {
  const arr = this.sort();
  const result = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      result.push(arr[i]);
    }
  }
  return result;
}

/* 基于indexOf或includes */
/* 不修改数组本身 */
const unique04 = Symbol('unique04');

Array.prototype[unique04] = function () {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    /* if (arr.indexOf(this[i]) === -1) */
    if (arr.includes(this[i]) === false) {
      arr.push(this[i]);
    }
  }
  return arr;
}

/* 修改数组本身 */
/* splice */

const arr = [1, 1, 1, 3, 3, {
  4: undefined
}, {
  5: undefined
}];
console.log(arr[unique04]());