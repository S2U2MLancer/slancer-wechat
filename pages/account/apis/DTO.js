

export class LoginReqDTO {
  /**
   * @param {string} code : get from code in wechat login response
   */
  constructor(code) {
    this.code = code;
  }
}

export class RegistReqDTO {
  constructor(code, nickName, gender, date) {
    this.code = code;
    this.nickName = nickName;
    this.gender = gender;
    this.date = date;
  }
}

export class LoginRespDTO {
  constructor(token, userInfo) {
    this.token = token;
    this.userInfo = userInfo;
  }
}
