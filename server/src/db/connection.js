import { Pool } from 'pg';
import dotenv from 'dotenv';

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
    this.pool = Model.initConnect();
    this.pool.on('connect', () => {
      console.log('connected to the db');
    });
  }

  /**
 * @method initConnect
 *
 * @returns {object} new connection
 */
  static initConnect() {
    const {
      USER, PASSWORD, HOST, DB_PORT, DATABASE,
    } = process.env;

    const poolsetting = {
      user: USER,
      password: PASSWORD,
      host: HOST,
      port: DB_PORT,
      database: DATABASE
    };

    return new Pool(poolsetting);
  }

  /**
   *
   * @method select
   * @param {string} params
   * @param {string} constraint
   *
   * @returns {query} query
   */
  async select(params, constraint) {
    try {
      const result = await this.pool.query(
        `SELECT ${params} ${this.table} WHERE ${constraint}`
      );
      return result.rows;
    } catch (err) {
      return err.message;
    }
  }

  /**
 *  @method create
 *
 * @param {string} params
 * @param {string} values
 *
 * @returns {query} query
 */
  async create(params, values) {
    try {
      const result = await this.pool.query(
        `INSERT INTO ${this.table}(${params}) VALUES(${values}) RETURNING *`
      );
      return result.rows;
    } catch (err) {
      return err.message;
    }
  }

  /**
 * @method update
 *
 * @param {string} params
 * @param {string} constraint
 *
 * @returns {query} query
 */
  async update(params, constraint) {
    try {
      const result = await this.pool.query(
        `UPDATE  ${this.table} SET ${params} WHERE ${constraint} RETURNING * `
      );
      return result.ro;
    } catch (err) {
      return err.message;
    }
  }

  /**
   * @method delete
   *
   * @param {string} params
   * @param {string} constraint
   *
   * @returns {query} query
   */
  async delete(params, constraint) {
    try {
      const result = await this.pool.query(
        `DELETE ${this.table} ${params} WHERE ${constraint} `
      );
      return result.rows;
    } catch (err) {
      return err.message;
    }
  }

  /**
   * @method selectAll
   *
   * @param {string} params
   *
   * @returns {query} query
   */
  async selectAll(params) {
    try {
      const result = await this.pool.query(`SELECT ${params} FROM ${this.table}`);
      return result.rows;
    } catch (err) {
      return err.message;
    }
  }
}
