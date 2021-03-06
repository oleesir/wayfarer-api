import jwt from 'jsonwebtoken';
import moment from 'moment';

const now = new Date();
const today = moment(now, 'YYYY-MM-DD').format('YYYY-MM-DD');
const tomorrow = moment(now, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
const yesterday = moment(now, 'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD');

const newUser = {
  first_name: 'ryan',
  last_name: 'gosling',
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

const emptyFirstName = { ...newUser, first_name: '' };
const emptyLastName = { ...newUser, last_name: '' };
const nonAlphabetsFirstName = { ...newUser, first_name: '/865' };
const nonAlphabetsLastName = { ...newUser, last_name: '/865' };
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
  user_id: 1,
  email: 'oleesir@gmail.com',
  first_name: 'Olisa',
  last_name: 'Emeka',
  password: 'secret',
  is_admin: true
};

const userPayload = {
  user_id: 2,
  email: 'nneka@gmail.com',
  first_name: 'Nneka',
  last_name: 'Oguah',
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
  trip_date: tomorrow,
};

const tripWithYesterdayDate = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_date: yesterday,
};

const tripWithTomorrowDate = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_date: tomorrow,
};

const tripWithTodayDate = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_date: today,
};

const tripWithUnavailableBus = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 2,
  fare: 5000,
  trip_date: tomorrow,
};

const tripWithUnexistingBus = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 30,
  fare: 5000,
  trip_date: tomorrow,
};

const tripWithUnavailableBusTwo = {
  origin: 'Anambra',
  destination: 'Benue',
  bus_id: 3,
  fare: 5000,
  trip_date: tomorrow,
};

const emptyTrip = {
  origin: '',
  destination: '',
  bus_id: '',
  fare: '',
  trip_date: '',
};

const incompleteTrip = {
  bus_id: 3,
};

const newBus = {
  number_plate: 'WER234UY',
  manufacturer: 'Grand Prime',
  model: 'equinox',
  year: 2006,
  capacity: 17
};

const emptyBusField = {
  number_plate: '',
  manufacturer: '',
  model: '',
  year: '',
  capacity: ''
};


const modelHavingMoreThanTwentyChar = {
  ...newBus, model: 'WER234UYRERYHhvhgvhgvhgvjhgvhvgvjhvjhvgvjhcgcfgcgvgcvfcfcjycvfcf'
};

const manufacturerHavingMoreThanThirtyChar = {
  ...newBus, manufacturer: 'WER234UYRERYHJBHJKVHDSBVJKSDBHVKJBDFHBVHFJDSBJHJHDVGWEVCGYEVHGCVCHGDVHSVKHDNJVKBUHSJFBFKUJSBVUKFHJSBDHJBFEHBV'
};

const tripId = 4;

const cancelTrip = {
  status: 'cancelled'
};

const wrongTripUpdate = {
  status: 'abort'
};

const emptyCancelTrip = {
  status: ''
};

const newBooking = {
  trip_id: 2,
  seat_number: 3,
};

const bookingWithUnexistingTrip = {
  trip_id: 24,
  seat_number: 3,
};

const bookingWithUnpendingTrip = {
  trip_id: 1,
  seat_number: 3,
};

const bookingWithUnavailableSeat = {
  trip_id: 4,
  seat_number: 3,
};

const bookingWithNoSeat = {
  trip_id: 5,
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
  emptyBusField,
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
  tripWithUnavailableBusTwo,
  newBus,
  modelHavingMoreThanTwentyChar,
  manufacturerHavingMoreThanThirtyChar,
  tripId,
  cancelTrip,
  emptyCancelTrip,
  wrongTripUpdate,
  newBooking,
  bookingWithUnexistingTrip,
  bookingWithUnpendingTrip,
  bookingWithUnavailableSeat,
  bookingWithNoSeat,
};
