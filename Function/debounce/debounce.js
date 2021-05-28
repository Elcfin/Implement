console.log("debounce");

/* 函数防抖 */

/* 非立即执行版本：
   触发事件后函数不会立即执行，而是在n秒后执行，如果在n秒内又触发了事件，则会重新计算函数延迟执行时间 */
function debounce01(func, delay) {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, delay);
  }
}

/* 立即执行版本：
   触发事件后函数会立即执行，在n秒内不触发事件才继续执行函数 */
function debounce02(func, delay) {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    const callNow = !timer;
    if (callNow) {
      func();
    }
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  }
}

/* 综合 */
function debounce(func, delay, immediate) {
  let timer = null;

  if (immediate) {
    return function () {
      if (timer !== null) {
        clearTimeout(timer);
      }
      const callNow = !timer;
      if (callNow) {
        func();
      }
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  } else {
    return function () {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(func, delay);
    }
  }
}

function add(a, b) {
  alert(a + b);
}

window.addEventListener("scroll", debounce(() => add(1, 2), 1000, false));