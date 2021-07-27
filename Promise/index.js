console.log("index");

console.log(new Promise((resolve, reject) => {
  resolve('done');
}).then(
  "not a function onFulfilled",
  "not a function onRejected"));