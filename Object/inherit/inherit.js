console.log("inherit");

/* 原型链实现 Prototype Chaining */
{
  function SuperType() {
    this.cats = ["yueyueCat"];
  }

  function SubType() {
    this.birds = ["yueyueBird"];
  }

  SubType.prototype = new SuperType();

  const instance = new SubType();
  console.log(instance);
}

/* 盗用构造函数 Constructor Stealing */
{
  function SuperType() {
    this.cats = ["yueyueCat"];
  }

  function SubType() {
    this.birds = ["yueyueBird"];
    SuperType.call(this);
  }

  const instance = new SubType();
  console.log(instance);
}

/* 组合继承 Combination Inheritance */
{
  function SuperType() {
    this.cats = ["yueyueCat"];
  }

  SuperType.prototype.sayName = function () {
    console.log(this.name);
  }

  function SubType() {
    this.birds = ["yueyueBird"];
    SuperType.call(this);
  }

  SubType.prototype = new SuperType();

  const instance = new SubType();
  console.log(instance);
}

/* 原型式继承 Prototypal Inheritance */
{
  const cat = {
    name: "yueyueCat",
    colors: ["pink", "white"]
  }

  const anotherCat = Object.create(cat, {
    name: {
      value: "yueyueMiao"
    }
  });

  console.log(anotherCat);
}

/* 寄生式继承 Parasitic Inheritance */
{
  function object(original) {
    const newObj = original;
    return newObj;
  } /* 任何返回新对象的函数 */

  function createAnother(original) {
    let clone = object(original);
    clone.sayHi =
      () => "Hi Yueyue";
    return clone;
  }

  const cat = {
    name: "yueyueCat"
  };

  const anotherCat = createAnother(cat);
  console.log(anotherCat.sayHi());
}

/* 寄生组合继承 Parasitic Combination Inheritance */
{
  function object(original) {
    const newObj = original;
    return newObj;
  } /* 任何返回新对象的函数 */

  function SuperType() {
    this.cats = ["yueyueCat"];
  }

  SuperType.prototype.sayName = function () {
    console.log(this.name);
  }

  function SubType() {
    this.birds = ["yueyueBird"];
    SuperType.call(this);
  }

  function inheritPrototype(SubType, SuperType) {
    const prototype = object(SuperType.prototype);
    prototype.constructor = SubType;
    SubType.prototype = prototype;
  }

  inheritPrototype(SubType, SuperType);
  const instance = new SubType();
  console.log(instance);
}