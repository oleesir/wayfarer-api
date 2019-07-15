import Model from '../db/index';

const buses = new Model('buses');

/**
 * @class Buses
 */
export default class BusController {
/**
 * @method createBus
 *
 * @param {object} req
 * @param {object} res
 *
 * @returns {object} status and message
 */
  static async createBus(req, res) {
    const {
      number_plate: numberPlate,
      manufacturer,
      model,
      year,
      capacity
    } = req.body;


    const [existingBus] = await buses.select(['*'], [`number_plate='${numberPlate}'`]);

    if (existingBus) {
      return res.status(400).json({
        status: 'error',
        error: 'This bus already exists'
      });
    }


    const [newBus] = await buses.create(['number_plate', 'manufacturer', 'model', 'year', 'capacity'],
      [`'${numberPlate}','${manufacturer}','${model}',${year},${capacity}`]);

    const data = {
      bus_id: newBus.id,
      plate_number: newBus.number_plate,
      manufacturer: newBus.manufacturer,
      model: newBus.model,
      year: newBus.year,
      capacity: newBus.capacity
    };

    return res.status(201).json({
      status: 'success',
      data,
      message: 'Bus was created successfully'
    });
  }
}
