  console.log("call");

  Function.prototype._call = function (context, ...args) {
    if (typeof this !== "function") {
      throw new TypeError(this + "is not a function");
    }
    if (context === null || context === undefined) {
      return this();
    }
    context.fun = this;
    const result = context.fun(...args);
    delete context.fun;
    return result;
  }

  console.log("_call" + " " + obj.fun._call(objTry, "cat", "miao"));

  /*  function _call(obj, ...args) {
      obj.fun = this;
      const result = obj.fun(...args);
      delete obj.fun;
      return result;
    }
    Object.prototype._call = _call; */