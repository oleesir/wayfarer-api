import { Pool } from 'pg';
import dotenv from 'dotenv';
import getConfig from './config';

dotenv.config();
/**
 * @class Model
 */
export default class Model {
  /**
   * @constructor
   * @param {object} table
   */
  constructor(table) {
    this.table = table;
    this.pool = Model.init();
    this.pool.on('connect', () => {
      console.log('connected to the db');
    });
  }

  /**
   * @static
   * @method init
   *
   * @returns {Pool} connection
   */
  static init() {
    const config = getConfig();

    return new Pool(config);
  }

  /**
   *
   * @method select
   *
   * @param {array} attributes
   * @param {array} constraint
   *
   * @returns {query} query
   */
  async select(attributes, constraint) {
    try {
      const result = await this.pool.query(
        `SELECT ${attributes} FROM ${this.table} WHERE ${constraint}`
      );

      return result.rows;
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * @method create
   *
   * @param {array} attributes
   * @param {array} values
   *
   * @returns {query} query
   */
  async create(attributes, values) {
    try {
      const result = await this.pool.query(
        `INSERT INTO ${this.table}(${attributes}) VALUES(${values}) RETURNING *`
      );

      return result.rows;
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
 * @method update
 *
 * @param {array} attributes
 * @param {array} constraint
 *
 * @returns {query} query
 */
  async update(attributes, constraint) {
    try {
      const result = await this.pool.query(
        `UPDATE  ${this.table} SET ${attributes} WHERE ${constraint} RETURNING * `
      );
      return result.rows;
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * @method delete
   *
   * @param {array} constraint
   *
   * @returns {query} query
   */
  async delete(constraint) {
    try {
      const result = await this.pool.query(
        `DELETE FROM ${this.table} WHERE ${constraint}`
      );
      return result;
    } catch (err) {
      console.log(err.message);
    }
  }

  /**
   * @method selectAll
   *
   * @param {array} attributes
   *
   * @returns {query} query
   */
  async selectAll(attributes) {
    try {
      const result = await this.pool.query(`SELECT ${attributes} FROM ${this.table}`);
      return result.rows;
    } catch (err) {
      console.log(err.message);
    }
  }
}
