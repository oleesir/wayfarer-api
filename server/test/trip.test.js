import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

import {
  adminToken,
  newTrip,
  emptyTrip,
  tomorrow,
  tripWithYesterdayDate,
  tripWithTodayDate,
  tripWithUnavailableBus,
  tripWithUnexistingBus,
  tripWithUnavailableBusTwo,
  userToken,
  fakeToken,
  expiredToken
} from './helpers/fixtures';

const URL = '/api/v1/';

describe('Trips Route', () => {
  describe('Create trip', () => {
    it('should create a new trip', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(newTrip)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('success');
          expect(res.body.data).to.have.property('id').equal(4);
          expect(res.body.data).to.have.property('origin').equal('Anambra');
          expect(res.body.data).to.have.property('destination').equal('Benue');
          expect(res.body.data).to.have.property('bus_id').equal(3);
          expect(res.body.data).to.have.property('time').equal('23:00');
          expect(res.body.data).to.have.property('fare').equal('5000');
          expect(res.body.data).to.have.property('date').equal(tomorrow);
          expect(res.body.data).to.have.property('duration').equal(30);
          expect(res.body).to.have.property('message').equal('Trip was created successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a trip when the type is an empty string', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(emptyTrip)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;

          expect(res.body).to.have.property('status').equal('error');
          expect(error.origin).to.eql([
            '"origin" is not allowed to be empty',
            '"origin" with value "" fails to match the required pattern: /^[a-zA-Z]+$/',
            '"origin" length must be at least 2 characters long'
          ]);
          expect(error.destination).to.eql([
            '"destination" is not allowed to be empty',
            '"destination" with value "" fails to match the required pattern: /^[a-zA-Z]+$/',
            '"destination" length must be at least 2 characters long'
          ]);
          expect(error.bus_id).to.eql(['"bus_id" must be a number']);
          expect(error.fare).to.eql(['"fare" must be a number']);
          expect(error.trip_date).to.eql(['"trip_date" must be in ISO 8601 (YYYY-MM-DD) date format e.g "2019-07-21"']);
          expect(error.trip_time).to.eql([
            '"trip_time" is required',
            '"trip_time" must be in the 24 hour format e.g "08:30", "23:00" etc'
          ]);
          expect(error.duration).to.eql(['"duration" must be a number']);

          if (err) return done(err);
          done();
        });
    });

    it('should not create a new trip with bus that would be unavailable at start time', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(newTrip)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('This bus is unavailable, please use another bus');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a new trip with bus that would be unavailable during trip duration', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(tripWithUnavailableBusTwo)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('This bus is unavailable, please use another bus');
          if (err) return done(err);
          done();
        });
    });

    it("should not create a new trip with yesterday's date", (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(tripWithYesterdayDate)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(error.trip_date).to.eql(['"trip_date" must be a date after today']);
          if (err) return done(err);
          done();
        });
    });

    it("should not create a new trip with today's date", (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(tripWithTodayDate)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(error.trip_date).to.eql(['"trip_date" must be a date after today']);
          if (err) return done(err);
          done();
        });
    });


    it('should not create a new trip with an unavailable bus', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(tripWithUnavailableBus)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('This bus is unavailable, please use another bus');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a new trip if the bus does not exist', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(tripWithUnexistingBus)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('This bus does not exist, please use another bus');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a user create a trip', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(newTrip)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('You are not authorized to perform this action');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a trip with invalid token', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(newTrip)
        .set('Authorization', `Bearer ${fakeToken}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('Invalid token');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a trip with an expired token', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(newTrip)
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('User authorization token is expired');
          if (err) return done(err);
          done();
        });
    });
  });
});
