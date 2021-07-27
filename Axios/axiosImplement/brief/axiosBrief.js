/* 简易 axios 实现 */

class InterceptorsManage {
  /* 拦截器 */
  constructor() {
    this.handlers = [];
  }

  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    });
  }
}

class Axios {
  constructor() {
    this.interceptors = {
      request: new InterceptorsManage,
      response: new InterceptorsManage
    };
  }

  send(config) {
    /* 发送响应 */
    return new Promise(function (resolve) {
      const {
        url = '', method = 'get', data = ''
      } = config;

      const xhr = new XMLHttpRequest();

      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        resolve(xhr.responseText);
      }

      xhr.send(JSON.stringify(data));
    })
  }

  request(config) {
    const chain = [this.send.bind(this), undefined];

    this.interceptors.request.handlers.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })

    this.interceptors.response.handlers.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    let promise = Promise.resolve(config);
    while (chain.length > 0)
      promise = promise.then(chain.shift(), chain.shift());
    return promise;
  }
}

const methods = ['get', 'delete', 'options', 'head', 'post', 'put', 'patch'];

methods.forEach(method => {
  Axios.prototype[method] = function () {
    if (['get', 'delete', 'options', 'head'].includes(method))
      /* 2个参数 (url[, config]) */
      return this.request({
        url: arguments[0],
        method,
        /* 没有第 2 个参数传入时，arguments[1] 为 undefined，{sth: '', ...undefined} = {sth: ''} */
        ...arguments[1]
      });
    else
      /* 3个参数 (url[,data[,config]]) */
      return this.request({
        url: arguments[0],
        method,
        data: arguments[1] || {},
        ...arguments[2]
      });
  }
})

const utils = {
  extend(a, b, ctx) {
    for (const key in b)
      if (Object.prototype.hasOwnProperty.call(b, key)) {
        if (typeof b[key] === 'function')
          a[key] = b[key].bind(ctx);
        else a[key] = b[key];
      }
  }
}

const createAxios = function () {
  const axios = new Axios;
  const req = axios.request.bind(axios);

  utils.extend(req, Axios.prototype, axios);
  utils.extend(req, axios);
  return req;
}

const axios = createAxios();

export default axios;