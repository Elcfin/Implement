console.log("Object.create");

/* Object.create()方法创建一个新的对象
   并以方法的第一个参数作为新对象的__proto__属性的值
  （以第一个参数作为新对象的构造函数的原型对象） */

/* Object.create()方法还有第二个可选参数
   是一个对象
   对象的每个属性都会作为新对象的自身属性
   对象的属性值以descriptor（Object.getOwnPropertyDescriptor(obj, 'key')）的形式出现
   且enumerable默认为false */

const myCreate = Symbol('myCreate');
Object[myCreate] = function (proto, obj) {
  if (!(Object.prototype.toString.call(proto) === '[object Object]' || proto === null)) {
    throw new TypeError("Object prototype may only be an Object or null: " + proto);
  }
  if (obj === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  function Func() {}
  Func.prototype = proto;
  const newObj = new Func();
  /* 在通过 new 关键字来创建一个对象的时候
     会查看 Func.prototype 是不是一个对象
     如果不是的话，就设置为 Object.prototype */
  if (obj !== undefined) {
    Object.defineProperties(newObj, obj);
  }

  if (proto === null) {
    newObj.__proto__ = null;
  }
  return newObj;
}