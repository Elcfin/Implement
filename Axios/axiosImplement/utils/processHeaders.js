const normalizeHeaders =
  (headers, normalizeHeaderName) => {
    /* 兼容请求头中大小写 */
    Object.keys(headers).forEach(headerName => {
      if (
        headerName !== normalizeHeaderName &&
        headerName.toUpperCase() === normalizeHeaderName.toUpperCase()
      ) {
        headers[normalizeHeaderName] = headers[headerName]
        delete headers[headerName]
      }
    })
    return headers
  }

const processHeaders = (headers, data) => {
  /* 这里将 content-type 统一转换成 Content-Type */
  headers = normalizeHeaders(headers, "Content-Type")
  /* 如果用户传递了 data 且没有设置 Content-Type 属性，则设置默认值 */
  if (!headers["Content-Type"] && data)
    headers["Content-Type"] = "application/json;charset=utf-8"
  return headers
}

export default processHeaders