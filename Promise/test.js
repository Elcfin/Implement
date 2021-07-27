console.log("test");

console.log(new Promise((resolve, reject) => {
  resolve('done');
}).then());