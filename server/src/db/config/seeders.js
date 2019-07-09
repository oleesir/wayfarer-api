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

  INSERT INTO buses (number_plate, manufacturer, model, year, status, capacity)
  VALUES('JFK123LI', 'General Motors', 'Chevrolet' ,'2012', 'available', 17);
  INSERT INTO buses (number_plate, manufacturer, model, year, status, capacity)
  VALUES('JFK456LY', 'General Motors', 'Ford' ,'2015', 'unavailable', 17);
  INSERT INTO buses (number_plate, manufacturer, model, year, status, capacity)
  VALUES('JFK789LK', 'General Motors', 'Toyoyta' ,'2009', 'available', 17);
  INSERT INTO buses (number_plate, manufacturer, model, year, status, capacity)
  VALUES('JFK101LT', 'General Motors', 'Honda' ,'2018', 'available', 17);
  INSERT INTO buses (number_plate, manufacturer, model, year, status, capacity)
  VALUES('JFK112LX', 'General Motors', 'Bentley' ,'2009', 'unavailable', 17);  
  INSERT INTO buses (number_plate, manufacturer, model, year, status, capacity)
  VALUES('JFK112TT', 'General Motors', 'Bentley' ,'2004', 'available', 17);

  INSERT INTO trips (origin, destination, bus_id, fare, trip_time, trip_date, duration, status)
  VALUES('Lagos', 'Warri', 3 , 5000, '08:30', '2019-05-04', 720, 'done');
  INSERT INTO trips (origin, destination, bus_id, fare, trip_time, trip_date, duration, status)
  VALUES('Lagos', 'Anambra', 2 , 3000, '07:30', '2019-08-10', 45, 'unstarted');
  INSERT INTO trips (origin, destination, bus_id, fare, trip_time, trip_date, duration, status)
  VALUES('Lagos', 'Benue', 1 , 4000, '07:50', '2019-08-15', 120, 'unstarted');  
`;
