/* 呜呜呜 这个递归是自己写的 */
const handleObject = (str, obj) => {
  let parts = []
  Object.keys(obj).forEach(key => {
    let ownStr
    const value = obj[key]
    if (Object.prototype.toString.call(value) === "[object Object]")
      ownStr = handleObject(`${str}[${key}]`, value)
    else if (Array.isArray(value))
      ownStr = handleArray(`${str}[${key}]`, value)
    else ownStr = `${str}[${key}]=${value}`
    parts.push(ownStr)
  })
  return parts.join("&")
}

const handleArray = (str, arr) => {
  let parts = []
  arr.forEach((value, index) => {
    let ownStr
    if (Object.prototype.toString.call(value) === "[object Object]")
      ownStr = handleObject(`${str}[${index}]`, value)
    else if (Array.isArray(value)) ownStr = handleArray(`${str}[${index}]`, value)
    else ownStr = `${str}[${index}]=${value}`
    parts.push(ownStr)
  })
  return parts.join("&")
}

/* 将 params 参数拼接到 url 后面 */
const handleURL = (url, params) => {
  if (!params) return url

  const parts = []

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (Object.prototype.toString.call(value) === "[object Object]")
      parts.push(handleObject(`${key}`, value))
    else if (Array.isArray(value))
      parts.push(handleArray(`${key}`, value))
    else parts.push(`${key}=${value}`)
  })

  /* 去除 hash */
  if (url.includes("#"))
    url = url.slice(0, url.indexOf("#"))

  const queryStr = parts.join("&")

  /* 处理 url 中关于 ? */
  if (url.includes("?"))
    url += "&" + queryStr
  else url += "?" + queryStr
  return url
}

export default handleURL