import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { ADMIN_PASSWORD, USER_PASSWORD } = process.env;
const adminPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
const userPassword = bcrypt.hashSync(USER_PASSWORD, 10);

export default `
  INSERT INTO users (firstname, lastname, email ,password, is_admin)
  VALUES('Olisa', 'Emeka', 'oleesir@gmail.com' ,'${adminPassword}', true);
  INSERT INTO users (firstname, lastname, email ,password, is_admin)
  VALUES('Nneka', 'Oguah', 'nneka@gmail.com' ,'${userPassword}', false);
  INSERT INTO users (firstname, lastname, email ,password, is_admin)
  VALUES('James', 'Udoh', 'james@gmail.com' ,'${userPassword}', false);
  INSERT INTO users (firstname, lastname, email ,password, is_admin)
  VALUES('Amaka', 'Emodi', 'amaka@gmail.com' ,'${adminPassword}', true);
`;
