import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const { ADMIN_PASSWORD, USER_PASSWORD } = process.env;
const adminPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
const userPassword = bcrypt.hashSync(USER_PASSWORD, 10);

export default `
  INSERT INTO users (first_name, last_name, email ,password, is_admin)
  VALUES('Olisa', 'Emeka', 'oleesir@gmail.com' ,'${adminPassword}', true);
  INSERT INTO users (first_name, last_name, email ,password, is_admin)
  VALUES('Nneka', 'Oguah', 'nneka@gmail.com' ,'${userPassword}', false);
  INSERT INTO users (first_name, last_name, email ,password, is_admin)
  VALUES('James', 'Udoh', 'james@gmail.com' ,'${userPassword}', false);
  INSERT INTO users (first_name, last_name, email ,password, is_admin)
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

  INSERT INTO trips (origin, destination, bus_id, fare, trip_date, status, available_seats)
  VALUES('Lagos', 'Warri', 3 , 5000, '2019-05-04', 'done', 17);
  INSERT INTO trips (origin, destination, bus_id, fare, trip_date, status, available_seats)
  VALUES('Port Harcourt', 'Anambra', 2 , 3000, '2019-08-10', 'pending', 17);
  INSERT INTO trips (origin, destination, bus_id, fare, trip_date, status, available_seats)
  VALUES('Lagos', 'Benue', 1 , 4000, '2019-08-15', 'done', 16);
  INSERT INTO trips (origin, destination, bus_id, fare, trip_date, status, available_seats)
  VALUES('Lagos', 'Adamawa', 6 , 4000, '2019-09-15', 'pending', 0); 
  INSERT INTO trips (origin, destination, bus_id, fare, trip_date, status, available_seats)
  VALUES('Lagos', 'Abuja', 5 , 9000, '2019-09-15', 'pending', 17); 

  INSERT INTO bookings (trip_id, user_id, seat_number) VALUES(3, 2, 10);
  INSERT INTO bookings (trip_id, user_id, seat_number) VALUES(5, 4, 1);
`;
