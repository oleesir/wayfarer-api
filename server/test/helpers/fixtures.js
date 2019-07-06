import jwt from 'jsonwebtoken';

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
  isAdmin: true
};

const userPayload = {
  id: 2,
  email: 'nneka@gmail.com',
  firstname: 'Nneka',
  lastname: 'Oguah',
  password: 'secret',
  isAdmin: false
};

const userToken = jwt.sign(userPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const adminToken = jwt.sign(adminPayload, process.env.SECRET_KEY, { expiresIn: '1day' });
const expiredToken = jwt.sign(userPayload, process.env.SECRET_KEY, { expiresIn: '1' });
const fakeToken = 'uh2ygy34758357t.njidvfhvbrubbjb';

const emptyAuthUser = {
  email: '',
  password: ''
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
  wrongEmailAuthUser
};
