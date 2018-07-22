import { getServiceUrl } from "../../../net/ServerPathBuilder";
import { HttpMethod } from "../../../net/Constant";
import { SendRequest } from "../../../net/ServerHandler";
import { LoginReqDTO } from "./DTO";

/**
 * 
 * @param {String} code, get from wx.login
 * @param {Function} success : 
 */
export function login(code, success, failed) {
  const reqData = new LoginReqDTO(code)
  SendRequest('/weChat/login', HttpMethod.GET, null, reqData, success, failed)
}

export function reg() {
}