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
   * @param {string} attributes
   * @param {string} constraint
   *
   * @returns {query} query
   */
  async select(attributes, constraint) {
    try {
      const result = await this.pool.query(
        `SELECT ${attributes} FROM ${this.table} WHERE ${constraint}`
      );

      return Model.snakeToCamelCase(result.rows);
    } catch (err) {
      return err.message;
    }
  }

  /**
   *  @method create
   *
   * @param {string} attributes
   * @param {string} values
   *
   * @returns {query} query
   */
  async create(attributes, values) {
    try {
      const result = await this.pool.query(
        `INSERT INTO ${this.table}(${attributes}) VALUES(${values}) RETURNING *`
      );

      return Model.snakeToCamelCase(result.rows);
    } catch (err) {
      return err.message;
    }
  }

  /**
 * @method update
 *
 * @param {string} attributes
 * @param {string} constraint
 *
 * @returns {query} query
 */
  async update(attributes, constraint) {
    try {
      const result = await this.pool.query(
        `UPDATE  ${this.table} SET ${attributes} WHERE ${constraint} RETURNING * `
      );
      return Model.snakeToCamelCase(result.rows);
    } catch (err) {
      return err.message;
    }
  }

  /**
   * @method delete
   *
   * @param {string} attributes
   * @param {string} constraint
   *
   * @returns {query} query
   */
  async delete(attributes, constraint) {
    try {
      const result = await this.pool.query(
        `DELETE ${this.table} ${attributes} WHERE ${constraint} `
      );
      return Model.snakeToCamelCase(result.rows);
    } catch (err) {
      return err.message;
    }
  }

  /**
   * @method selectAll
   *
   * @param {string} attributes
   *
   * @returns {query} query
   */
  async selectAll(attributes) {
    try {
      const result = await this.pool.query(`SELECT ${attributes} FROM ${this.table}`);
      return Model.snakeToCamelCase(result.rows);
    } catch (err) {
      return err.message;
    }
  }

  /**
   * @static
   *
   * @method snakeToCamelCase
   *
   * @param {array} result
   *
   * @returns {array} rseult with camel case
   */
  static snakeToCamelCase(result) {
    return result.map((item) => {
      for (const [key, value] of Object.entries(item)) {
        const camelCasedKey = key.replace(/(_\w)/g, m => m[1].toUpperCase());
        item[camelCasedKey] = value;

        if (key.match(/(_\w)/g)) {
          delete item[key];
        }
      }

      return item;
    });
  }
}
