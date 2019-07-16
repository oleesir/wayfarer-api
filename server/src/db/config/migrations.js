export const dropTables = `
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS buses CASCADE;
  DROP TABLE IF EXISTS trips CASCADE;
  DROP TABLE IF EXISTS bookings CASCADE;
`;

export const dropTypes = `
  DROP TYPE IF EXISTS TRIP_STATUS;
  DROP TYPE IF EXISTS BUS_STATUS;
`;

/*
  trip is pending by default,
  active when the trip starts i.e. is in progress,
  done when the trip is done,
  and cancelled when the trip is cancelled
*/
export const createTypes = `
  CREATE TYPE TRIP_STATUS AS ENUM ('done', 'active', 'pending', 'cancelled');
  CREATE TYPE BUS_STATUS AS ENUM ('available', 'unavailable');
`;

export const createTables = `
  CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

  CREATE TABLE IF NOT EXISTS buses(
  id SERIAL PRIMARY KEY,
  number_plate VARCHAR UNIQUE NOT NULL,
  manufacturer VARCHAR NOT NULL,
  model VARCHAR NOT NULL,
  year INT NOT NULL,
  capacity INT NOT NULL,
  status BUS_STATUS NOT NULL DEFAULT 'available',
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

  CREATE TABLE IF NOT EXISTS trips(
  id SERIAL PRIMARY KEY,
  origin VARCHAR NOT NULL,
  destination VARCHAR NOT NULL,
  bus_id INT,
  fare NUMERIC NOT NULL,
  trip_date DATE NOT NULL,
  status TRIP_STATUS NOT NULL DEFAULT 'pending',
  available_seats INT NOT NULL,
  FOREIGN KEY(bus_id) REFERENCES buses(id) ON DELETE SET NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

  CREATE TABLE IF NOT EXISTS bookings(
  id SERIAL PRIMARY KEY,
  trip_id INT NOT NULL,
  user_id INT NOT NULL,
  seat_number INT NOT NULL,
  FOREIGN KEY(trip_id) REFERENCES trips(id) ON DELETE SET NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);  
`;

export default {
  createTables, dropTables, createTypes, dropTypes
};
