/**
 * Gets Random Seat for User
 *
 * @param {number} capacity bus capacity
 * @param {array} unavailableSeats already assigned seat
 * @param {number} assignedSeat already assigned seat
 *
 * @returns {number} seat
 */
function getRandomSeat(capacity, unavailableSeats, assignedSeat = 1) {
  if (unavailableSeats.indexOf(assignedSeat) > -1) {
    assignedSeat = Math.floor(Math.random() * capacity) + 1;

    return getRandomSeat(capacity, unavailableSeats, assignedSeat);
  }

  return assignedSeat;
}

export default getRandomSeat;
