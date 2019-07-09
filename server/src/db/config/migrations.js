export const dropTables = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS buses CASCADE;
  DROP TABLE IF EXISTS trips CASCADE;
`;

export const dropTypes = `
  DROP TYPE IF EXISTS TRIP_STATUS;
  DROP TYPE IF EXISTS BUS_STATUS;
`;

export const createTypes = `
  CREATE TYPE TRIP_STATUS AS ENUM ('done', 'started', 'unstarted', 'canceled');
  CREATE TYPE BUS_STATUS AS ENUM ('available', 'unavailable');
`;

export const createTables = `
  CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

  CREATE TABLE IF NOT EXISTS buses(
  id SERIAL PRIMARY KEY,
  number_plate VARCHAR UNIQUE NOT NULL,
  manufacturer VARCHAR NOT NULL,
  model VARCHAR NOT NULL,
  year INT NOT NULL,
  capacity INT NOT NULL,
  status BUS_STATUS NOT NULL DEFAULT 'available',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

  CREATE TABLE IF NOT EXISTS trips(
  id SERIAL PRIMARY KEY,
  origin VARCHAR NOT NULL,
  destination VARCHAR NOT NULL,
  bus_id INT,
  fare NUMERIC NOT NULL,
  trip_time TIME NOT NULL,
  trip_date DATE NOT NULL,
  duration INT NOT NULL,
  status TRIP_STATUS NOT NULL DEFAULT 'unstarted',
  FOREIGN KEY(bus_id) REFERENCES buses(id) ON DELETE SET NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);
  
`;

export default {
  createTables, dropTables, createTypes, dropTypes
};
