import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Model from '../db/index';


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
      firstname, lastname, email, password
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
      ['firstname', 'lastname', 'email', 'password', 'is_admin'],
      [`'${firstname}', '${lastname}', '${email}', '${hashedPassword}', false`]
    );

    const payload = {
      id: newUser.id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1day' });

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
}
