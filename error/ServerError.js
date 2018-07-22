/**
 * Error Code Process
 */

const ErrTypeLfShift = 20;
export class ServerError extends Error {
  /**
   * @param {number} serverErrorCode
   * @param {String} msg
   */
  constructor(serverErrorCode, msg) {
    super(msg);
    this.type = serverErrorCode >>> ErrTypeLfShift;
    this.code = serverErrorCode ^ (this.type << ErrTypeLfShift);
  }
}
