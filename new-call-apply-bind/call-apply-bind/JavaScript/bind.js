console.log("bind");

/* 
 * bind() 函数会创建一个新函数（称为绑定函数）
 * 新函数与被调函数（绑定函数的目标函数）具有相同的函数体
 * 当新函数被调用时this值绑定到bind()的第一个参数，该参数不能被重写
 * 绑定函数被调用时，bind()也接受预设的参数提供给原函数
 * 一个绑定函数也能使用new操作符创建对象
 *   把原函数当成构造器，忽略提供的this值，提供其余调用时的参数给模拟函数
 */

Function.prototype._bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function");
  }
  const self = this;

  function fbind(...bindArgs) {
    /* 
     * 判断fbind是否被当作构造函数调用
     * new.target
     */
    return self.apply(new.target ? this : context, args.concat(bindArgs));
  }
  fbind.prototype = self.prototype;
  return fbind;
}

const fun = obj.fun._bind();
const newFun = new fun;

/* 
 * 以_bind为构造函数时
 * 1.创建一个新对象
 * 2.继承原型链：使新对象的__proto__属性等于obj.fun._bind()，即fbind的prototype属性，即self的prototype属性
 * 3.将新对象作为obj.fun._bind()，即fbind的this并调用函数，即调用了self.apply(新对象,参数)
 * 4.如果self.apply(新对象,参数)返回值为对象，则返回该对象，否则返回新对象赋值给newFun
 */

/*
function _bind(obj, ...args) {
  obj.fun = this;
  return function () {
    return obj.fun(...args);
  };
}
Object.prototype._bind = _bind; 
*/