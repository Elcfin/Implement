import {
  parseResponseHeaders
} from "../utils"

/* 封装 XMLHttpRequest */
const xhr =
  /* config 可以理解为在调用 axios 时所传的对象 */
  config => {
    /* 返回一个 Promise */
    return new Promise(resolve => {
      const {
        url,
        method = "get",
        data,
        headers,
        responseType
      } = config

      const request = new XMLHttpRequest()

      if (responseType)
        request.responseType = responseType

      request.open(method, url, true)

      Object.keys(headers).forEach(headerName => {
        request.setRequestHeader(headerName, headers[headerName])
      })

      request.send(data)

      request.onload = () => {
        const responseHeaders = parseResponseHeaders(
          request.getAllResponseHeaders()
        )

        const responseData =
          request.responseType === "text" ?
          request.responseText :
          request.response

        const response = {
          /* 返回后的数据 */
          data: responseData,
          /* 状态码 */
          status: request.status,
          /* 状态文本 */
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          /* XMLHttpRequest对象 */
          request
        }
        resolve(response)
      }
    })
  }

export default xhr