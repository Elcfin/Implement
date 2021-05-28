console.log("clone");

/* 浅克隆 */
function shallowClone(obj, newObj = {}) {
  if (!(Object.prototype.toString.call(obj) === '[object Object]'))
    throw new TypeError(obj + " is not an object");
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

/* 深克隆 */

/* 使用JSON对象转化 deepClone01 */
/* 如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象 */
/* 如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象 */
/* 如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失 */
/* 如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null */
/* JSON.stringify()只能序列化对象的可枚举的自有属性
   例如 如果obj中的对象是由构造函数生成的，则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor */
/* 如果对象中存在循环引用的情况也无法正确实现深拷贝 */

function deepClone01(obj, newObj = {}) {
  newObj = JSON.parse(JSON.stringify(obj));
  return newObj;
}

/* 递归 deepClone02 */
function deepClone02(data) {
  const type = this.judgeType(data);
  let obj = null;
  if (type == 'array') {
    obj = [];
    for (let i = 0; i < data.length; i++) {
      obj.push(this.deepClone02(data[i]));
    }
  } else if (type == 'object') {
    obj = {}
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        obj[key] = this.deepClone02(data[key]);
      }
    }
  } else {
    return data;
  }
  return obj;
}

function judgeType(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
}

/* 递归 deepClone03 */
/* 减少条件判断 */
/* 是否有必要呢 */
const deepClone03 = {
  deepClone: function (data) {
    let type = this.judgeType(data);
    type = (type === 'array' || type === 'object') ? type : 'others'; /* 或许可以更简洁，暂时想不出来 */
    const newData = this[type](data);
    return newData;
  },

  array: function (arr, newArr = []) {
    for (let i = 0; i < arr.length; i++) {
      newArr.push(this.deepClone(arr[i]));
    }
    return newArr;
  },
  object: function (obj, newObj = {}) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = this.deepClone(obj[key]);
      }
    }
    return newObj;
  },
  others: function (data) {
    return data;
  },

  judgeType: function (obj) {
    const toString = Object.prototype.toString;
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    };
    if (obj instanceof Element) {
      return 'element';
    };
    return map[toString.call(obj)];
  }
}

const mao = {
  friends: [1, 2, 3, 4, 5, 6],
  name: "mao",
  sayName: function () {
    return this.name;
  }
};
const miao = deepClone03.deepClone(mao);
mao.friends.push(7);
console.log(mao.sayName());
miao.name = "miao";
console.log(miao);