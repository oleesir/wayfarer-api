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
      bus_id: busId,
      fare,
      trip_date: tripDate,
      trip_time: tripTime,
      duration: tripDuration
    } = req.body;
    const [bus] = await buses.select(['*'], [`id='${busId}'`]);
    const existingTripsWithBus = await trips.select(['*'], [`bus_id='${busId}' AND status!='done'`]);

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
        } = getTripTimeRange(tripDate, tripTime, tripDuration);

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
      [`'${origin}','${destination}', ${busId}, ${fare},'${tripTime}','${tripDate}',${tripDuration}`]);

    const data = {
      id: newTrip.id,
      origin: newTrip.origin,
      destination: newTrip.destination,
      bus_id: newTrip.bus_id,
      fare: newTrip.fare,
      time: moment(newTrip.trip_time, 'HH:mm').format('HH:mm'),
      date: moment(newTrip.trip_date).format('YYYY-MM-DD'),
      duration: newTrip.duration
    };

    return res.status(201).json({
      status: 'success',
      data,
      message: 'Trip was created successfully'
    });
  }
}
