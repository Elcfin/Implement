import {
  handleURL,
  processHeaders,
  processRequestData
} from "../utils"
import xhr from "./xhr"

const processConfig = config => {
  const {
    url,
    params,
    headers = {},
    data
  } = config

  config.url = handleURL(url, params)
  config.headers = processHeaders(headers, data)
  config.data = processRequestData(data)
}

const sendRequest = config => {
  processConfig(config)
  return xhr(config)
}

export default sendRequest