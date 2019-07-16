import jwt from 'jsonwebtoken';

// console.log('auth', process.env);

/**
 * @class Authorization
 */
export default class Authorization {
  /**
   * @method verifyToken
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   *
   * @returns {object} status and message
   */
  static verifyToken(req, res, next) {
    const bearerToken = req.headers['x-access-token'] || req.headers.authorization || req.body.token || req.body.authorization || req.body.Authorization;
    const token = bearerToken && bearerToken.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: 'error',
        error: 'Please provide a token'
      });
    }

    return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ status: 'error', error: 'User authorization token is expired' });
        }
        return res.status(401).json({ status: 'error', error: 'Invalid token' });
      }
      req.decoded = decoded;
      return next();
    });
  }

  /**
   * @method generateToken
   *
   * @param {object} payload
   *
   * @returns {string} JWT
   */
  static generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });
  }

  /**
   * @method authorizeRole
   *
   * @param {string} role
   *
   * @returns {function} middleware to authorize role
   */
  static authorizeRole(role) {
    return (req, res, next) => {
      const { is_admin: isAdmin } = req.decoded;
      if ((role === 'admin' && !isAdmin) || (role !== 'admin' && isAdmin)) {
        return res.status(403).json({
          status: 'error',
          error: 'You are not authorized to perform this action'
        });
      }

      return next();
    };
  }
}
