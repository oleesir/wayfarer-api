import { Client } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const {
  USER, HOST, PASSWORD, DATABASE, DB_PORT, ADMIN_PASS, USER_PASS
} = process.env;

const connectString = new Client({
  user: USER,
  host: HOST,
  password: PASSWORD,
  database: DATABASE,
  port: DB_PORT
});

connectString.connect();

const adminPass = bcrypt.hashSync(ADMIN_PASS, 10);
const userPass = bcrypt.hashSync(USER_PASS, 10);


const createTable = async () => {
  try {
    const query = `
      DROP TABLE IF EXISTS users CASCADE;

      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR NOT NULL,
      lastName VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL,
      password TEXT NOT NULL,
      isAdmin BOOLEAN NOT NULL,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

      INSERT INTO users (firstName, lastName, email ,password, isAdmin)
      VALUES('Olisa', 'Emeka', 'oleesir@gmail.com' ,'${adminPass}', true);
      INSERT INTO users (firstName, lastName, email ,password, isAdmin)
      VALUES('Nneka', 'Oguah', 'nneka@gmail.com' ,'${userPass}', false);
      INSERT INTO users (firstName, lastName, email ,password, isAdmin)
      VALUES('James', 'Udoh', 'james@gmail.com' ,'${userPass}', false);
      INSERT INTO users (firstName, lastName, email ,password, isAdmin)
      VALUES('Amaka', 'Emodi', 'amaka@gmail.com' ,'${adminPass}', true);`;

    await connectString.query(query);
    connectString.end();
  } catch (err) {
    console.log(err);
    await connectString.end();
  }
};
createTable();
