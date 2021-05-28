console.log("throttle");

/* 函数节流 */
/* 一个函数在一定时间内只能执行一次 */

/* 时间戳方案 */
function throttle01(func, delay) {
  let pre = Date.now();
  return function () {
    let now = Date.now();
    if (now - pre >= delay) {
      func();
      pre = Date.now();
    }
  }
}

/* 定时器方案 */
function throttle02(func, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        func();
        timer = null;
      }, delay);
    }
  }
}

function add(a, b) {
  alert(a + b);
}

window.addEventListener("scroll", throttle02(() => add(1, 2), 1000));