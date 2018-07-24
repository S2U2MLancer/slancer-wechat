import { HttpMethod } from "../../../net/Constant";
import { sendRequest } from "../../../net/ServerHandler";
import { LoginReqDTO, RegistReqDTO } from "./DTO";

function loginSuccess(resp) {
  wx.setStorage({
    key: ClientKeys.Token,
    data: resp.token
  })

  wx.setStorage({
    key: ClientKeys.UserInfo,
    data: resp.userInfo
  })
}


/**
 * 
 * @param {String} code, get from wx.login
 * @param {Function} success : 
 */
export function login(code, success, failed) {
  const reqData = new LoginReqDTO(code)
  sendRequest(
    null, '/account/weChat/login', HttpMethod.POST, 
    null, reqData, 
    (resp) => {
      this.loginSuccess(resp)
      success(resp)
    }, 
    failed
  )
}

export function reg(regInfo, success, failed) {
  sendRequest(null, '/account/weChat/register', HttpMethod.POST, null, regInfo,
  (resp) => {
    this.loginSuccess(resp)
    success(resp)
  }, failed)
}