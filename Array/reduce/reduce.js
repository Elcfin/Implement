console.log("reduce");

const myReduce = Symbol('myReduce');
Array.prototype[myReduce] = function (func, initialValue) {
  if (typeof func !== "function") {
    throw new TypeError(arguments[0] + " is not a function");
  }

  if (this.length === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  const initialArr = this,
    arr = initialArr.concat(); /* 创建副本 */

  if (initialValue) {
    arr.unshift(initialValue);
  }

  let index = 0,
    newValue;

  while (arr.length > 1) {
    index = initialArr.length - arr.length + 1;
    newValue = func.call(null, arr[0], arr[1], index, initialArr);
    arr.splice(0, 2, newValue);
  }

  return newValue;
}

const arr = [1, 2, 3];
console.log(arr.reduce((pre, cur) => pre + cur));
console.log(arr[myReduce]((pre, cur) => pre + cur));