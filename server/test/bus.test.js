import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import {
  newBus,
  adminToken,
  emptyBusField,
  userToken,
  fakeToken,
  manufacturerHavingMoreThanThirtyChar,
  modelHavingMoreThanTwentyChar
} from './helpers/fixtures';

const URL = '/api/v1/';

describe('Bus Route', () => {
  describe('Create bus', () => {
    it('should create a new bus', (done) => {
      request(app)
        .post(`${URL}/buses`)
        .send(newBus)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('success');
          expect(res.body.data).to.have.property('id').equal(7);
          expect(res.body.data).to.have.property('plate_number').equal('WER234UY');
          expect(res.body.data).to.have.property('manufacturer').equal('Grand Prime');
          expect(res.body.data).to.have.property('model').equal('equinox');
          expect(res.body.data).to.have.property('year').equal(2006);
          expect(res.body.data).to.have.property('capacity').equal(17);
          expect(res.body).to.have.property('message').equal('Bus was created successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a new bus with empty fields', (done) => {
      request(app)
        .post(`${URL}/buses`)
        .send(emptyBusField)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.body).to.have.property('status').equal('error');
          expect(error.number_plate).to.eql([
            '"number_plate" is required',
            '"number_plate" must be in this format e.g "JFK123PO", "KLM768TY" etc',
            '"number_plate" must have a length of 8 characters'
          ]);
          expect(error.manufacturer).to.eql([
            '"manufacturer" is required',
            '"manufacturer" must be in this format e.g "General Motors", "Toyota" etc',
            '"manufacturer" must not be less than 2 characters'
          ]);
          expect(error.model).to.eql(['"model" is required',
            '"model" must be in this format e.g "lexus350", "camry 2.4" etc',
            '"model" must not be less than 2 characters']);
          expect(error.year).to.eql(['"year" must be a number']);
          expect(error.capacity).to.eql(['"capacity" must be a number']);
          if (err) return done(err);
          done();
        });
    });

    it('should allow a user create a new bus', (done) => {
      request(app)
        .post(`${URL}/buses`)
        .send(newBus)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(401)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.body).to.have.property('status').equal(401);
          expect(error).to.eql('You are not authorized to perform this action');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a new bus with an invalid token', (done) => {
      request(app)
        .post(`${URL}/buses`)
        .send(newBus)
        .set('Authorization', `Bearer ${fakeToken}`)
        .expect(401)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.body).to.have.property('status').equal(401);
          expect(error).to.eql('Invalid token');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a new bus without authorization token provided', (done) => {
      request(app)
        .post(`${URL}/buses`)
        .send(newBus)
        .expect(401)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.body).to.have.property('status').equal(401);
          expect(error).to.eql('Please provide a token');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a new bus when manufacturers length of characters is more than 30', (done) => {
      request(app)
        .post(`${URL}/buses`)
        .send(manufacturerHavingMoreThanThirtyChar)
        .expect(400)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.body).to.have.property('status').equal('error');
          expect(error.manufacturer).to.eql(['"manufacturer" must be in this format e.g "General Motors", "Toyota" etc',
            '"manufacturer" must not be more than 30 characters']);
          if (err) return done(err);
          done();
        });
    });


    it('should not create a new bus when model length of characters is more than 20', (done) => {
      request(app)
        .post(`${URL}/buses`)
        .send(modelHavingMoreThanTwentyChar)
        .expect(400)
        .set('Authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.body).to.have.property('status').equal('error');
          expect(error.model).to.eql(['"model" must not be more than 20 characters']);
          if (err) return done(err);
          done();
        });
    });
  });
});
