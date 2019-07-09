import moment from 'moment';

// 1 hour allowance to proepare car after each trip
const allowanceInHour = 1;

/**
 * Gets Trip Time Range
 * @param {string} startDate start date in YYYY-MM-DD format
 * @param {string} startTime start time in HH:mm format
 * @param {number} duration  duration in minutes
 *
 * @returns {object} object of from and to
 */
function getTripTimeRange(startDate, startTime, duration) {
  const date = (moment(startDate).format('YYYY-MM-DD')).split('-'); // ['2019', '07', '08']
  const time = startTime.split(':');

  const from = moment().set({
    year: date[0], month: date[1] - 1, date: date[2], hours: time[0], minutes: time[1]
  }).format('YYYY-MM-DDTHH:mm');

  const to = moment().set({
    year: date[0],
    month: date[1] - 1, // Months are zero indexed
    date: date[2],
    hours: Number(time[0]) + allowanceInHour,
    minutes: (Number(time[1]) + Number(duration))
  }).format('YYYY-MM-DDTHH:mm');
  return { from, to };
}

export default getTripTimeRange;
