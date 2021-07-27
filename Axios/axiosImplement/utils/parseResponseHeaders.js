/* request.getAllResponseHeaders 返回的是字符串，将其解析成对象 */
const parseResponseHeaders = headers => {
  const parsed = {}
  if (!headers) return parsed

  /* request.getAllResponseHeaders 返回的字符串中每个响应头由回车分割 \r\n */
  headers.split("\r\n").forEach(
    line => {
      if (!line) return
      const [key, value] = line.split(":")
      parsed[key.trim()] = value.trim()
    }
  )
}

export default parseResponseHeaders