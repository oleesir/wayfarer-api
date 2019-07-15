import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Model from '../db/index';
import Authorization from '../middlewares/Authorization.middleware';


dotenv.config();
const users = new Model('users');

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * @method signUp
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status code, data and message properties
   */
  static async signup(req, res) {
    const {
      first_name, last_name, email, password
    } = req.body;

    const existingUser = await users.select(['email'], [`email='${email}'`]);

    if (existingUser.length > 0) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists'
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const [newUser] = await users.create(
      ['first_name', 'last_name', 'email', 'password', 'is_admin'],
      [`'${first_name}', '${last_name}', '${email}', '${hashedPassword}', false`]
    );

    const payload = {
      user_id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      is_admin: newUser.is_admin
    };

    const token = Authorization.generateToken(payload);

    delete newUser.password;

    const data = {
      ...newUser,
      token,
    };
    return res.status(201).json({
      status: 'success',
      data,
      message: 'User registered successfully'
    });
  }

  /**
   * @method signin
   *
   * @param {object} req request
   * @param {object} res response
   *
   * @returns {object}  status code, data and message properties
   */
  static async signin(req, res) {
    const { password, email } = req.body;
    const [user] = await users.select(['*'], `email='${email}'`);

    if (!user) {
      return res.status(401).json({
        status: 401,
        error: 'Email or password is incorrect'

      });
    }

    if (user) {
      const {
        id: user_id, first_name, last_name, is_admin
      } = user;
      const verifyUserPassword = bcrypt.compareSync(password, user.password);

      if (!verifyUserPassword) {
        return res.status(401).json({
          status: 401,
          error: 'Email or password is incorrect'

        });
      }

      const payload = {
        user_id,
        first_name,
        last_name,
        email,
        is_admin
      };

      const token = Authorization.generateToken(payload);

      const data = {
        ...payload,
        token
      };

      return res.status(200).json({
        status: 'success',
        data,
        message: 'Login successful'
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'Email or password is incorrect'
    });
  }
}
