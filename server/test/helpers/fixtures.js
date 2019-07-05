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

const emptyFirstName = { ...newUser, firstname: '' };
const emptyLastName = { ...newUser, lastname: '' };
const nonAlphabetsFirstName = { ...newUser, firstname: '/865' };
const nonAlphabetsLastName = { ...newUser, lastname: '/865' };
const emptyEmail = { ...newUser, email: '' };
const invalidEmail = { ...newUser, email: 'ryangmail.com' };
const emptyPassword = { ...newUser, password: '' };
const invalidPasswordLength = { ...newUser, password: 'rya' };
const existingEmail = { ...newUser, email: 'ryan@gmail.com' };

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
  existingEmail
};
