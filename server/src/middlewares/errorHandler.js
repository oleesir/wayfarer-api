/**
 * @exports
 * @class ErrorHandler
 */
export default class ErrorHandler {
  /**
  * @method sendError
  * @param {object} err
  * @param {object} req
  * @param {object} res
  * @param {function} next
  *
  * @returns {(function|object)} Function next() or JSON object
  */
  static sendError(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    return res.status(err.status || 500).json({ error: err.message });
  }
}
