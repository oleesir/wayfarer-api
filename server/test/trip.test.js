import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

import {
  adminToken,
  newTrip,
  emptyTrip,
  tomorrow,
  incompleteTrip,
  tripWithYesterdayDate,
  tripWithTodayDate,
  tripWithUnavailableBus,
  tripWithUnexistingBus,
  tripWithUnavailableBusTwo,
  userToken,
  fakeToken,
  expiredToken,
  getATrip,
  getANonexistingTrip,
  getAnInvalidTrip
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

    it('should not create a trip when payload is empty', (done) => {
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

    it('should not create a trip when payload is incomplete', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(incompleteTrip)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;

          expect(res.body).to.have.property('status').equal('error');
          expect(error.origin).to.eql(['"origin" is required']);
          expect(error.destination).to.eql(['"destination" is required']);
          expect(error.fare).to.eql(['"fare" is required']);
          expect(error.trip_date).to.eql(['"trip_date" is required']);
          expect(error.trip_time).to.eql(['"trip_time" is required']);
          expect(error.duration).to.eql(['"duration" is required']);

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

    it('should not create a new trip with year after 2029', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send({ ...tripWithTodayDate, trip_date: '2030-01-01' })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(error.trip_date).to.eql(['"trip_date" must be a date before "2029-12-31"']);
          if (err) return done(err);
          done();
        });
    });

    it('should not create a new trip with wrong date format', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send({ ...tripWithTodayDate, trip_date: '01-01-2020' })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(error.trip_date).to.eql(['"trip_date" must be in ISO 8601 (YYYY-MM-DD) date format e.g "2019-07-21"']);
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


    it('should not create a trip without authorization token provided', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send(newTrip)
        .expect(401)
        .end((err, res) => {
          expect(res.body).to.have.property('error').equal('Please provide a token');
          if (err) return done(err);
          done();
        });
    });

    it('should not create a trip with duration less than 30 minutes', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send({ ...newTrip, duration: 25 })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(error).to.have.property('duration').eql(['"duration" must be minutes greater than 30 and less than 2880 (i.e. 2 days) e.g "45", "180" etc']);
          if (err) return done(err);
          done();
        });
    });

    it('should not create a trip with duration more than 2 days (2880 minutes)', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send({ ...newTrip, duration: 2895 })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(error).to.have.property('duration').eql(['"duration" must be minutes greater than 30 and less than 2880 (i.e. 2 days) e.g "45", "180" etc']);
          if (err) return done(err);
          done();
        });
    });

    it('should not create a trip with duration that is not an integer', (done) => {
      request(app)
        .post(`${URL}/trips`)
        .send({ ...newTrip, duration: 34.5 })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(error).to.have.property('duration').eql(['"duration" must be minutes greater than 30 and less than 2880 (i.e. 2 days) e.g "45", "180" etc']);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get trip', () => {
    it('should allow an admin get a trip', (done) => {
      request(app)
        .get(`${URL}/trips/${getATrip}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
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

          if (err) return done(err);
          done();
        });
    });

    it('should allow a user get a trip', (done) => {
      request(app)
        .get(`${URL}/trips/${getATrip}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200)
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

          if (err) return done(err);
          done();
        });
    });

    it('should not allow a user get a non-existing trip', (done) => {
      request(app)
        .get(`${URL}/trips/${getANonexistingTrip}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('Trip does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow an admin get a non-existing trip', (done) => {
      request(app)
        .get(`${URL}/trips/${getANonexistingTrip}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('Trip does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow an admin get an invalid trip', (done) => {
      request(app)
        .get(`${URL}/trips/${getAnInvalidTrip}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.body).to.have.property('status').equal('error');
          expect(error.id).to.eql(['"id" must be a number']);
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a user get an invalid trip', (done) => {
      request(app)
        .get(`${URL}/trips/${getAnInvalidTrip}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400)
        .end((err, res) => {
          const { error } = res.body;
          expect(res.body).to.have.property('status').equal('error');
          expect(error.id).to.eql(['"id" must be a number']);
          if (err) return done(err);
          done();
        });
    });
  });
});
