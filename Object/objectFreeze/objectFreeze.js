console.log("Object.freeze");

/* 冻结 */
const myFreeze = Symbol('myFreeze');
Object[myFreeze] = function (obj) {
  if (obj instanceof Object) {
    Object.seal(obj);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
          writable: false
        });
      }
    }
  }
  return obj;
}

/* 深度冻结 */
const myDeepFreeze = Symbol('myDeepFreeze');
Object[myDeepFreeze] = function (obj) {
  if (obj instanceof Object) {
    Object.seal(obj);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
          writable: false
        });
        Object[myDeepFreeze](obj[key]);
      }
    }
  }
  return obj;
}