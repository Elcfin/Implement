/* axios 所传 data 为对象形式，
   axios 默认是 Payload 格式数据请求，即 Content-Type: 'application/json; charset=utf-8'
   需要转换成 JSON 字符串 */
const processRequestData =
   data => JSON.stringify(data)

export default processRequestData