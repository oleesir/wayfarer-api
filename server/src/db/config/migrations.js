export const dropTables = `
  DROP TABLE IF EXISTS users CASCADE;
`;

export const createTables = `
  CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
`;


export default { createTables, dropTables };
