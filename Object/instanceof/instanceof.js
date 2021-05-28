console.log("instanceof");

function myInstanceof(obj, func) {
  let proto = Object.getPrototypeOf(obj);
  const prototype = func.prototype;
  while (proto) {
    if (proto === prototype)
      return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}