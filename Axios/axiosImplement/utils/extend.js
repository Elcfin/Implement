import Axios from "../core/Axios"

const extend = (instance, axios) => {
  /* Object.getOwnPropertyNames() 方法返回一个由指定对象的所有自身属性的属性名
  （包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组 */
  Object.getOwnPropertyNames(Axios.prototype).filter(
    method => method !== "constructor"
  ).forEach(method => {
    /* 将 Axios.prototype 上的所有属性及方法复制到 instance 中 */
    if (typeof axios[method] === "function")
      instance[method] = axios[method].bind(axios)
    else
      instance[method] = axios[method]
  })

  /* 将 axios 上的所有属性及方法复制到 instance 中 */
  Object.getOwnPropertyNames(axios)
    .forEach(method => {
      if (typeof axios[method] === "function")
        instance[method] = axios[method].bind(axios)
      else
        instance[method] = axios[method]
    })
}

export default extend