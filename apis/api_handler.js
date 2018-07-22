/**
 * 
 */

import * as app_config from '../config/app_config.js'

export function build_url(api_url) {
  let url = app_config.account_service_host + api_url
  // let url = [app_config.account_service_host, api_url].join('/')
  console.debug(url)
  return url
}

const err_type_lf_shift = 20
export class ResponseErrorInfo {
  constructor(code, msg) {
    this.err_type = code >>> err_type_lf_shift
    this.err_value = code ^ (this.err_type << err_type_lf_shift)
    this.msg = msg
  }
}

export function server_error_proc(err_resp) {
  console.error(err_resp)
}

export function http_error_proc(err_resp) {
  console.error(err_resp)
}

const resp_code_key = 'code'
const resp_data_key = 'data'
const resp_errmsg_key = 'errMsg'

export function response_process(resp, success_cb, fail_cb = server_error_proc) {
  let resp_data = resp.data

  if (!(resp_code_key in resp_data)) {
    success_cb(resp_data)
    return
  }

  let code = resp_data[resp_code_key]
  if (code == 0) {
    let data = resp_data[resp_data_key]
    success_cb(data)
    return
  }

  let errmsg = resp_data[resp_errmsg_key]
  let err = new ResponseErrorInfo(code, errmsg)
  fail_cb(err)
}
