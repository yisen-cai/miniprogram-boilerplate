import { netRequest } from "../utils/network"



export function hello() {
  return netRequest('/hello', 'GET')
}


