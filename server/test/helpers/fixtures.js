import jwt from 'jsonwebtoken';
import moment from 'moment';

const now = new Date();
const today = moment(now, 'YYYY-MM-DD').format('YYYY-MM-DD');
const tomorrow = moment(now, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
const yesterday = moment(now, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD');

const newUser = {
  firstname: 'ryan',
  lastname: 'gosling',
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};


const authUser = {
  email: 'ryan@gmail.com',
  password: 'ryangosl'
};

const emptyFirstName = { ...newUser, firstname: '' };
const emptyLastName = { ...newUser, lastname: '' };
const nonAlphabetsFirstName = { ...newUser, firstname: '/865' };
const nonAlphabetsLastName = { ...newUser, lastname: '/865' };
const emptyEmail = { ...newUser, email: '' };
const invalidEmail = { ...newUser, email: 'ryangmail.com' };
const emptyPassword = { ...newUser, password: '' };
const invalidPasswordLength = { ...newUser, password: 'rya' };
const existingEmail = { ...newUser, email: 'ryan@gmail.com' };
const emptyEmailAuthUser = { ...authUser, email: '' };
const wrongEmailAuthUser = { ...authUser, email: 'ryangmail.com' };
const emptyPasswordAuthUser = { ...authUser, password: '' };
const wrongUserAuth = { ...authUser, email: 'ryan@gmail.com', password: 'ryangoreswe' };
const wrongUserAuthEmail = { ...authUser, email: 'kennygray@gmail.com', password: 'ryangosl' };

const adminPayload = {
  id: 1,
  email: 'oleesir@gmail.com',
  firstname: 'Olisa',
  lastname: 'Emeka',
  password: 'secret',
  is_admin: true
};

const userPayload = {
  id: 2,
  email: 'nneka@gmail.com',
  firstname: 'Nneka',
  lastname: 'Oguah',
  password: 'secret',
  is_admin: false
};

const userToken = jwt.sign(userPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const adminToken = jwt.sign(adminPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const expiredToken = jwt.sign(userPayload, process.env.SECRET_KEY, { expiresIn: '1' });
const fakeToken = 'uh2ygy34758357t.njidvfhvbrubbjb';

const emptyAuthUser = {
  email: '',
  password: ''
};

const newTrip = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_time: '23:00',
  trip_date: tomorrow,
  duration: 30
};

const tripWithYesterdayDate = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_time: '23:00',
  trip_date: yesterday,
  duration: 30
};

const tripWithTomorrowDate = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_time: '23:00',
  trip_date: tomorrow,
  duration: 30
};

const tripWithTodayDate = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_time: '23:00',
  trip_date: today,
  duration: 30
};

const tripWithUnavailableBus = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 2,
  fare: 5000,
  trip_time: '23:00',
  trip_date: tomorrow,
  duration: 30
};

const tripWithUnexistingBus = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 30,
  fare: 5000,
  trip_time: '23:00',
  trip_date: tomorrow,
  duration: 30
};

const tripWithUnavailableBusTwo = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_time: '23:15',
  trip_date: tomorrow,
  duration: 30
};

const emptyTrip = {
  origin: '',
  destination: '',
  bus_id: '',
  fare: '',
  trip_time: '',
  trip_date: '',
  duration: ''
};

const incompleteTrip = {
  bus_id: 3,
};

export {
  newUser,
  emptyUser,
  emptyFirstName,
  emptyLastName,
  nonAlphabetsFirstName,
  nonAlphabetsLastName,
  emptyEmail,
  invalidEmail,
  emptyPassword,
  invalidPasswordLength,
  existingEmail,
  userToken,
  adminToken,
  expiredToken,
  fakeToken,
  authUser,
  emptyAuthUser,
  emptyEmailAuthUser,
  emptyPasswordAuthUser,
  wrongUserAuth,
  wrongUserAuthEmail,
  wrongEmailAuthUser,
  newTrip,
  emptyTrip,
  tomorrow,
  incompleteTrip,
  tripWithYesterdayDate,
  tripWithTomorrowDate,
  tripWithTodayDate,
  tripWithUnavailableBus,
  tripWithUnexistingBus,
  tripWithUnavailableBusTwo
};
