import dotenv from 'dotenv';

dotenv.config();

const {
  USER, HOST, PASSWORD, DATABASE, TEST_DATABASE, DATABASE_URL, DB_PORT, NODE_ENV
} = process.env;

export default () => {
  if (NODE_ENV === 'production') {
    return ({ connectionString: DATABASE_URL });
  }

  if (NODE_ENV === 'test') {
    return ({
      user: USER,
      host: HOST,
      password: PASSWORD,
      database: TEST_DATABASE,
      port: DB_PORT
    });
  }

  return ({
    user: USER,
    host: HOST,
    password: PASSWORD,
    database: DATABASE,
    port: DB_PORT
  });
};
