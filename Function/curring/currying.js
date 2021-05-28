console.log("currying");

/* 通用函数柯里化 */

function currying(func, ...args) {
  return function (...newArgs) {
    args.push(...newArgs);
    if (func.length > args.length) {
      return currying(func, ...args);
    } else {
      /* 递归结束，执行函数 */
      return func.apply(this, args);
    }
  }
}

const func = currying((a, b, c, d) => a + b + c + d);

console.log(func(1)(2)(3)(4));