import '@babel/polyfill';
import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';
import {
  userToken,
  newBooking,
  bookingWithUnexistingTrip,
  bookingWithUnpendingTrip,
  bookingWithUnavailableSeat,
  adminToken
} from './helpers/fixtures';

const URL = '/api/v1/';

describe('Booking Route', () => {
  describe('Create booking', () => {
    it('should allow a user create a booking', (done) => {
      request(app)
        .post(`${URL}/bookings`)
        .send(newBooking)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(201)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('success');
          expect(res.body.data).to.have.property('booking_id').equal(3);
          expect(res.body.data).to.have.property('bus_id').equal(2);
          expect(res.body.data).to.have.property('user_id').equal(2);
          expect(res.body.data).to.have.property('trip_id').equal(2);
          expect(res.body.data).to.have.property('trip_date');
          expect(res.body.data).to.have.property('trip_time');
          expect(res.body.data).to.have.property('seat_number').equal(3);
          expect(res.body.data).to.have.property('first_name').equal('Nneka');
          expect(res.body.data).to.have.property('last_name').equal('Oguah');
          expect(res.body.data).to.have.property('email').equal('nneka@gmail.com');
          expect(res.body.data).to.have.property('origin').equal('Port Harcourt');
          expect(res.body.data).to.have.property('destination').equal('Anambra');
          expect(res.body.data).to.have.property('created_on');
          expect(res.body).to.have.property('message').equal('Booking was created successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a user create a booking with an already booked seat', (done) => {
      request(app)
        .post(`${URL}/bookings`)
        .send(newBooking)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(409)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('This seat is unavailable, please choose another seat');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a user to book a trip that is unexisting', (done) => {
      request(app)
        .post(`${URL}/bookings`)
        .send(bookingWithUnexistingTrip)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('Trip does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a user to book a trip that is not pending', (done) => {
      request(app)
        .post(`${URL}/bookings`)
        .send(bookingWithUnpendingTrip)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('Trip cannot be booked because it is either active, done or cancelled');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow a user to book a trip that does not have available seats', (done) => {
      request(app)
        .post(`${URL}/bookings`)
        .send(bookingWithUnavailableSeat)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('Trip does not have any available seats');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow an admin book a trip', (done) => {
      request(app)
        .post(`${URL}/bookings`)
        .send(bookingWithUnavailableSeat)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(403)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('You are not authorized to perform this action');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Get booking', () => {
    it('should get all bookings in the app for an admin', (done) => {
      request(app)
        .get(`${URL}/bookings`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('success');
          expect(res.body.data.length).to.equal(3);
          expect(res.body.data[0]).to.have.property('booking_id');
          expect(res.body.data[0]).to.have.property('bus_id');
          expect(res.body.data[0]).to.have.property('user_id');
          expect(res.body.data[0]).to.have.property('trip_id');
          expect(res.body.data[0]).to.have.property('trip_date');
          expect(res.body.data[0]).to.have.property('trip_time');
          expect(res.body.data[0]).to.have.property('seat_number');
          expect(res.body.data[0]).to.have.property('first_name');
          expect(res.body.data[0]).to.have.property('last_name');
          expect(res.body.data[0]).to.have.property('email');
          expect(res.body.data[0]).to.have.property('origin');
          expect(res.body.data[0]).to.have.property('destination');
          expect(res.body.data[0]).to.have.property('created_on');
          if (err) return done(err);
          done();
        });
    });

    it('should get all bookings that belong to a user for the user', (done) => {
      request(app)
        .get(`${URL}/bookings`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('success');
          expect(res.body.data.length).to.equal(2);
          expect(res.body.data[0]).to.have.property('booking_id');
          expect(res.body.data[0]).to.have.property('bus_id');
          expect(res.body.data[0]).to.have.property('user_id');
          expect(res.body.data[0]).to.have.property('trip_id');
          expect(res.body.data[0]).to.have.property('trip_date');
          expect(res.body.data[0]).to.have.property('trip_time');
          expect(res.body.data[0]).to.have.property('seat_number');
          expect(res.body.data[0]).to.have.property('first_name');
          expect(res.body.data[0]).to.have.property('last_name');
          expect(res.body.data[0]).to.have.property('email');
          expect(res.body.data[0]).to.have.property('origin');
          expect(res.body.data[0]).to.have.property('destination');
          expect(res.body.data[0]).to.have.property('created_on');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Delete booking', () => {
    it('should delete a booking for a user', (done) => {
      request(app)
        .delete(`${URL}/bookings/3`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('success');
          expect(res.body).to.have.property('message').equal('Booking deleted successfully');
          if (err) return done(err);
          done();
        });
    });

    it('should not delete a booking that does not exist', (done) => {
      request(app)
        .delete(`${URL}/bookings/3`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('This booking does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not delete a booking that is either done or active (in_progress)', (done) => {
      request(app)
        .delete(`${URL}/bookings/1`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('This booking cannot be deleted because it is either done or in progress (active)');
          if (err) return done(err);
          done();
        });
    });

    it('should not delete a booking that does not belong to the user', (done) => {
      request(app)
        .delete(`${URL}/bookings/2`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('This booking does not exist');
          if (err) return done(err);
          done();
        });
    });

    it('should not allow an admin delete a booking', (done) => {
      request(app)
        .delete(`${URL}/bookings/3`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(403)
        .end((err, res) => {
          expect(res.body).to.have.property('status').equal('error');
          expect(res.body).to.have.property('error').equal('You are not authorized to perform this action');
          if (err) return done(err);
          done();
        });
    });
  });
});
