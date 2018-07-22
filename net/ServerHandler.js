import * as appConfig from '../config/AppConfig';
import { ContentType } from 'c:/Users/XIAYY8~1/AppData/Local/Temp/Constant-b29eaae9__2832rwN0na268vNu';
import { ServerError } from '../error/ServerError';

function getServiceUrl(relUrl) {
  const paths = (appConfig.AccountServiceHost, relUrl)
  return paths.join('/')
}

function respSuccess(res, success, failed) { 
  const respData = res.data;

  const code = respData[ServerKey.Code];
  if (code === 0) {
    const data = respData[ServerKey.Data];
    success(data)
    return
  }

  const msg = respData[ServerKey.ErrorMsg]
  const err = new ServerError(code, msg)
  failed(err)
}

function responseHandle(serviceUrl, res, success, failed) {
  const status = Math.floor(res.statusCode / 100)
  if (status === 2) {
    respSuccess(res, success, failed)
    return
  }

  const respData = res.data;
  if (respData.hasOwnProperty(ServerKey.Code)) {
    const msg = respData[ServerKey.ErrorMsg]
    const err = new ServerError(code, msg)
    failed(err)
    return
  }
  
  console.error(`Request[${serviceUrl}] failed: ${res.statusCode}`)
}

/**
 * 
 * @param {String} serviceUrl 
 * @param {String} httpMethod 
 * @param {Object} header 
 * @param {Object} data 
 * @param {Function} success 
 * @param {Function} failed 
 */
export function sendRequest(serviceUrl, httpMethod, header, data, success, failed) {
  const apiUrl = getServiceUrl(serviceUrl);
  const reqHeader = {
    'content-type': ContentType.APPLICATION_JSON
  }

  if (header) {
    for(let key in header) {
      reqHeader[key] = header[key]
    }
  }

  wx.request({
    url: apiUrl,
    method: httpMethod,
    header: reqHeader,
    data: data,
    success: (res) => {
      this.responseHandle(serviceUrl, res, success, failed)
    }
  })
}
