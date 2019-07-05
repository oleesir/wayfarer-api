import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';


import {
  newUser, emptyUser,
  emptyFirstName, emptyLastName,
  nonAlphabetsFirstName,
  nonAlphabetsLastName,
  emptyEmail,
  invalidEmail,
  emptyPassword,
  invalidPasswordLength,
  existingEmail
} from './helpers/fixtures';

const URL = '/api/v1/auth';
describe('Auth Routes', () => {
  describe('Signup Route', () => {
    it('should signup a new user', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('success');
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new user with empty input fields', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body.error.firstname[0]).to.equal('"firstname" is required');
          expect(res.body.error.lastname[0]).to.equal('"lastname" is required');
          expect(res.body.error.email[0]).to.equal('"email" is not allowed to be empty');
          expect(res.body.error.password[0]).to.equal('"password" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new user with an empty first name field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyFirstName)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body.error.firstname[0]).to.equal('"firstname" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with empty last name field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyLastName)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body.error.lastname[0]).to.equal('"lastname" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a user if the first name contains non-alphabets', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(nonAlphabetsFirstName)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body.error.firstname[0]).to.equal('"firstname" with value "/865" fails to match the required pattern: /^[a-zA-Z]+$/');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a user if the last name contains non-alphabets', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(nonAlphabetsLastName)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body.error.lastname[0]).to.equal('"lastname" with value "/865" fails to match the required pattern: /^[a-zA-Z]+$/');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new user with empty email field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body.error.email[0]).to.equal('"email" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an invalid email', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(invalidEmail)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body.error.email[0]).to.equal('"email" must be a valid email');
          if (err) return done(err);
          done();
        });
    });


    it('should not register a new user with empty password field', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(emptyPassword)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body.error.password[0]).to.equal('"password" is not allowed to be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a new user with an invalid password length', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(invalidPasswordLength)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body).to.have.property('status').eql('error');
          expect(res.body.error.password[0]).eql('"password" length must be at least 8 characters long');
          if (err) return done(err);
          done();
        });
    });

    it('should not register a user with an existing email address', (done) => {
      request(app)
        .post(`${URL}/signup`)
        .send(existingEmail)
        .expect(409)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('status').equal(409);
          expect(res.body).to.have.property('error').equal('User already exists');
          if (err) return done(err);
          done();
        });
    });
  });
});
