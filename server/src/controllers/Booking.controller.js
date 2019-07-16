import Model from '../db/index';

const bookings = new Model('bookings');
const trips = new Model('trips');

/**
 * @class BookingController
 */
export default class BookingController {
  /**
   * @method createBooking
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {object} status and response body
   */
  static async createBooking(req, res) {
    const {
      user_id, first_name, last_name, email
    } = req.decoded;
    const {
      trip_id,
      seat_number
    } = req.body;

    const [tripToBook] = await trips.select(['*'], [`id=${trip_id}`]);

    const existingBookings = await bookings.select(['*'], [`trip_id=${trip_id}`]);

    const isSeatUnavailable = existingBookings
      .find(booking => booking.seat_number === Number(seat_number));

    if (!tripToBook) {
      return res.status(404).json({
        status: 'error',
        error: 'Trip does not exist'
      });
    }

    if (isSeatUnavailable) {
      return res.status(409).json({
        status: 'error',
        error: 'This seat is unavailable, please choose another seat'
      });
    }

    if (tripToBook.available_seats === 0) {
      return res.status(400).json({
        status: 'error',
        error: 'Trip does not have any available seats'
      });
    }

    if (['done', 'active', 'cancelled'].includes(tripToBook.status)) {
      return res.status(400).json({
        status: 'error',
        error: 'Trip cannot be booked because it is either active, done or cancelled'
      });
    }

    const [newBooking] = await bookings.create(['trip_id', 'user_id', 'seat_number'], [`${trip_id}, ${user_id}, ${seat_number}`]);

    await trips.update([`available_seats=${tripToBook.available_seats - 1}`], [`id=${trip_id}`]);

    const data = {
      booking_id: newBooking.id,
      user_id,
      trip_id: tripToBook.id,
      bus_id: tripToBook.bus_id,
      trip_date: tripToBook.trip_date,
      trip_time: tripToBook.trip_time,
      seat_number: newBooking.seat_number,
      first_name,
      last_name,
      email,
      origin: tripToBook.origin,
      destination: tripToBook.destination,
      created_on: newBooking.created_on,
    };

    return res.status(201).json({
      status: 'success',
      data,
      message: 'Booking was created successfully'
    });
  }

  /**
   * @method getAllBooking
   *
   * @param {object} req
   * @param {object} res
   *
   * @return {array} return
   */
  static async getAllBookings(req, res) {
    const {
      user_id,
      is_admin
    } = req.decoded;
    const selection = ['bookings.id AS booking_id', 'bookings.seat_number', 'trips.id AS trip_id', 'trips.bus_id', 'trips.origin', 'trips.destination', 'trips.status AS trip_status', 'trips.trip_date', 'trips.trip_time', 'users.id AS user_id', 'users.email', 'users.first_name', 'users.last_name', 'bookings.created_on'];
    const joins = ['LEFT JOIN trips ON bookings.trip_id = trips.id LEFT JOIN users ON bookings.user_id = users.id'];
    const where = [`user_id=${user_id}`];

    const eagerLoadedBookings = is_admin
      ? await bookings.selectAll(selection, joins)
      : await bookings.select(selection, where, joins);

    return res.status(200).json({
      status: 'success',
      data: eagerLoadedBookings
    });
  }

  /**
   * @method deleteBooking
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status and message
   */
  static async deleteBooking(req, res) {
    const { user_id } = req.decoded;
    const { id } = req.params;

    const [bookingToDelete] = await bookings.select(['trips.status AS trip_status'], [`bookings.id=${id} AND bookings.user_id=${user_id}`], ['LEFT JOIN trips ON trips.id = bookings.trip_id']);

    if (!bookingToDelete) {
      return res.status(404).json({
        status: 'error',
        error: 'This booking does not exist'
      });
    }

    if (['done', 'active'].includes(bookingToDelete.trip_status)) {
      return res.status(400).json({
        status: 'error',
        error: 'This booking cannot be deleted because it is either done or in progress (active)'
      });
    }

    await bookings.delete([`id=${id}`]);

    return res.status(200).json({
      status: 'success',
      message: 'Booking deleted successfully'
    });
  }
}
