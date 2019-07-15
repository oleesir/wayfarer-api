import moment from 'moment';

import Model from '../db/index';
import getTripTimeRange from '../utils/getTripTimeRange';

const trips = new Model('trips');
const buses = new Model('buses');

/**
 * @class Trips
 */
export default class TripController {
  /**
   * @method createTrip
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {objet} status and message
   */
  static async createTrip(req, res) {
    const {
      origin,
      destination,
      bus_id,
      fare,
      trip_date,
      trip_time,
      duration: tripDuration
    } = req.body;
    const [bus] = await buses.select(['*'], [`id='${bus_id}'`]);
    const existingTripsWithBus = await trips.select(['*'], [`bus_id='${bus_id}' AND status!='done'`]);

    if (!bus) {
      return res.status(400).json({
        status: 'error',
        error: 'This bus does not exist, please use another bus'
      });
    }

    if (bus.status === 'unavailable') {
      return res.status(400).json({
        status: 'error',
        error: 'This bus is unavailable, please use another bus'
      });
    }

    if (existingTripsWithBus.length > 0) {
      const
        {
          from: tripStartTime,
          to: tripEndTime
        } = getTripTimeRange(trip_date, trip_time, tripDuration);

      const isBusUnAvailable = existingTripsWithBus.some((trip) => {
        const { from, to } = getTripTimeRange(trip.trip_date, trip.trip_time, trip.duration);

        return (moment(tripStartTime).isBetween(from, to, null, [])
         || moment(tripEndTime).isBetween(from, to, null, []));
      });

      if (isBusUnAvailable) {
        return res.status(400).json({
          status: 'error',
          error: 'This bus is unavailable, please use another bus'
        });
      }
    }

    const [newTrip] = await trips.create(['origin', 'destination', 'bus_id', 'fare', 'trip_time', 'trip_date', 'duration'],
      [`'${origin}','${destination}', ${bus_id}, ${fare},'${trip_time}','${trip_date}',${tripDuration}`]);

    const data = {
      trip_id: newTrip.id,
      origin: newTrip.origin,
      destination: newTrip.destination,
      bus_id: newTrip.bus_id,
      fare: newTrip.fare,
      trip_time: moment(newTrip.trip_time, 'HH:mm').format('HH:mm'),
      trip_date: moment(newTrip.trip_date).format('YYYY-MM-DD'),
      duration: newTrip.duration,
      status: newTrip.status

    };

    return res.status(201).json({
      status: 'success',
      data,
      message: 'Trip was created successfully'
    });
  }


  /**
   * @method getAllTrips
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status code and message
   */
  static async getAllTrips(req, res) {
    const allTrips = await trips.selectAll(['*']);

    const data = allTrips.map(trip => ({
      trip_id: trip.id,
      origin: trip.origin,
      destination: trip.destination,
      bus_id: trip.bus_id,
      fare: trip.fare,
      trip_time: moment(trip.trip_time, 'HH:mm').format('HH:mm'),
      trip_date: moment(trip.trip_date).format('YYYY-MM-DD'),
      duration: trip.duration,
      status: trip.status
    }));

    return res.status(200).json({
      status: 'success',
      data
    });
  }


  /**
   * @method cancelTrip
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status amd message
   */
  static async getSingleTrip(req, res) {
    const { id: tripId } = req.params;
    const [tripDetails] = await trips.select(['*'], [`id='${tripId}'`]);

    if (!tripDetails) {
      return res.status(400).json({
        status: 'error',
        error: 'Trip does not exist'
      });
    }

    const {
      id: trip_id,
      origin,
      destination,
      bus_id,
      fare,
      duration,
      status
    } = tripDetails;

    const data = {
      trip_id,
      origin,
      destination,
      bus_id,
      fare,
      trip_time: moment(tripDetails.trip_time, 'HH:mm').format('HH:mm'),
      trip_date: moment(tripDetails.trip_date).format('YYYY-MM-DD'),
      duration,
      status
    };

    res.status(200).json({
      status: 'success',
      data
    });
  }


  /**
   * @method cancelTrip
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status and message
   */
  static async cancelTrip(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const [tripToUpdate] = await trips.select(['*'], [`id=${id}`]);

    if (!tripToUpdate) {
      return res.status(404).json({
        status: 'error',
        error: 'Trip does not exist'
      });
    }

    if (tripToUpdate.status === 'cancelled') {
      return res.status(409).json({
        status: 409,
        error: 'Trip is already cancelled'
      });
    }

    if (['started', 'done'].includes(tripToUpdate.status)) {
      return res.status(409).json({
        status: 400,
        error: 'Trip is already started/done and cannot be cancelled'
      });
    }

    await trips.update([`status='${status}'`], [`id=${id}`]);

    res.status(200).json({
      status: 'success',
      message: 'Status was successfully updated'
    });
  }
}
