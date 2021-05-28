function _new(constructor, ...args) {
  /* 创建一个新的对象 */
  const obj = {};
  /* 对新对象执行原型连接 */
  if (constructor.prototype === null) {
    obj.__proto__ = Object.prototype;
  } else {
    obj.__proto__ = constructor.prototype;
  }
  /* 新对象绑定到函数调用的this（将新创建的对象作为this的上下文）并调用函数 */
  const otherObj = constructor.apply(obj, args);
  /* 如果构造函数返回其他对象，否则返回新对象 */
  /* 对实例对象，toString()方法默认返回"[object Object]" */
  return (Object.prototype.toString.call(otherObj) === '[object Object]') ? otherObj : obj;
}

function Cat(name, age) {
  this.name = name;
  this.age = age;
}

const cat1 = _new(Cat, "miao", "one");
Cat.prototype.color = "color";
console.log(cat1);

const cat2 = new Cat("miao", "one");
console.log(cat2);