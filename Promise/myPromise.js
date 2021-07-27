console.log("myPromise");

/* 先实现基础功能 */

class Promise {

  /* 三种状态作为类的静态属性 */
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  /* 初始化值 */
  value = null;
  reason = null;
  state = Promise.PENDING; /* 最初处于请求态(pending) */
  onFulfilledCallbacks = []; /* 成功回调 */
  onRejectedCallbacks = []; /* 失败回调 */

  constructor(executor) {
    /* executor必须是一个函数 */
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver ' + executor + ' is not a function');
    };

    /* 绑定this */
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);

    /* 调用executor */
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    };
  }

  resolve(value) {
    if (this.state === Promise.PENDING) {
      this.state = Promise.FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(func => func(this, value));
    }
  }

  reject(reason) {
    if (this.state === Promise.PENDING) {
      this.state = Promise.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(func => func(this, reason));
    }
  }

  /* A promise must provide a then method to access its current or eventual value or reason. */
  /* A promise’s then method accepts two arguments. */
  then(onFulfilled, onRejected) {
    /* Both onFulfilled and onRejected are optional arguments. */
    /* If onFulfilled is not a function, it must be ignored. */
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value;
    /* If onRejected is not a function, it must be ignored. */
    onRejected =
      typeof onRejected === 'function' ? onRejected : reason => {
        throw reason;
      }

    const promise2 = new Promise((resolve, reject) => {
      if (this.state === Promise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            Promise.promiseResolve(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            Promise.promiseResolve(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.state === Promise.PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value);
              Promise.promiseResolve(promise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason);
              Promise.promiseResolve(promise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      };
    });

    return promise2;
  }

  static promiseResolve(promise, x, resolve, reject) {
    /* If promise and x refer to the same object, reject promise with a TypeError as the reason. */
    if (promise === x) {
      reject(new TypeError('Chaining cycle detected for promise'));
    }

    /* If x is a promise, adopt its state */
    let called = false;
    if (x instanceof Promise) {
      /* If x is pending, promise must remain pending until x is fulfilled or rejected. */
      /* If/when x is fulfilled, fulfill promise with the same value. */
      /* If/when x is rejected, reject promise with the same reason. */
      x.then(value => {
        Promise.promiseResolve(promise, value, resolve, reject);
      }, reason => {
        reject(reason);
      });
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      /* Otherwise, if x is an object or function */
      /* Let then be x.then */
      try {
        const then = x.then;
        if (typeof then === 'function') {
          then.call(x,
            value => {
              if (called) return;
              called = true;
              Promise.promiseResolve(promise, value, resolve, reject);
            }, reason => {
              if (called) return;
              called = true;
              reject(reason);
            });
        } else {
          /* If then is not a function, fulfill promise with x. */
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        /* If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason. */
        reject(e);
      };
    } else {
      /* If x is not an object or function, fulfill promise with x. */
      resolve(x);
    }
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
module.exports = Promise;