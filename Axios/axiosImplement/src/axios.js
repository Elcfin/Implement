import Axios from "../core/Axios"
import {
  extend
} from "../utils"

const createInstance = () => {
  const axios = new Axios()
  const instance = axios.request.bind(axios)

  extend(instance, axios)
  return instance
}

const axios = createInstance()

export default axios