import sendRequest from "./sendRequest"
import InterceptorsManager from "./InterceptorsManager"

class Axios {

  constructor() {
    this.interceptors = {
      request: new InterceptorsManager,
      response: new InterceptorsManager
    }
  }

  request(config) {
    const promiseChain = [
      sendRequest,
      undefined
    ]

    this.interceptors.request.handlers.forEach(interceptor => {
      promiseChain.unshift(interceptor.fulfilled, interceptor.rejected)
    })

    this.interceptors.response.handlers.forEach(interceptor => {
      promiseChain.push(interceptor.fulfilled, interceptor.rejected)
    })

    let promise = Promise.resolve(config)

    while (promiseChain.length)
      promise = promise.then(promiseChain.shift(), promiseChain.shift())

    return promise
  }
}

const methods = ['get', 'delete', 'options', 'head', 'post', 'put', 'patch']

methods.forEach(method => {
  Axios.prototype[method] = function () {
    if (['get', 'delete', 'options', 'head'].includes(method))
      /* 2个参数 (url[, config]) */
      return this.request({
        url: arguments[0],
        method,
        /* 没有第 2 个参数传入时，arguments[1] 为 undefined，{sth: '', ...undefined} = {sth: ''} */
        ...arguments[1]
      })
    else
      /* 3个参数 (url[,data[,config]]) */
      return this.request({
        url: arguments[0],
        method,
        data: arguments[1] || {},
        ...arguments[2]
      })
  }
})

export default Axios