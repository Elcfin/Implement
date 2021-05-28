  console.log("apply");

  Function.prototype._apply = function (context, args) {
    if (typeof this !== "function") {
      throw new TypeError(this + "is not a function");
    }
    if (!(Array.isArray(args))) {
      throw new TypeError("CreateListFromArrayLike called on non-object");
    }
    if (context == null || context == undefined) {
      return this();
    }
    context.fun = this;
    const result = context.fun(...args);
    delete context.fun;
    return result;
  }

  console.log("_apply" + " " + obj.fun._apply(objTry, ["cat", "miao"]));

  /*  function _apply(obj, args) {
      if (!(Array.isArray(args))) {
        throw new TypeError("CreateListFromArrayLike called on non-object");
      }
      obj.fun = this;
      const result = obj.fun(...args);
      delete obj.fun;
      return result;
    }
    Object.prototype._apply = _apply; */