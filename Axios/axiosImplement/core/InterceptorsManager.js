class InterceptorManager {

  constructor() {
    this.handlers = []
  }

  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled,
      rejected
    })
  }
}

export default InterceptorManager