import { Client } from 'pg';
import {
  dropTables, createTables, createTypes, dropTypes
} from './config/migrations';
import seeders from './config/seeders';
import getConfig from './config';

const config = getConfig();
const connectString = new Client(config);

const setupDB = async () => {
  try {
    await connectString.connect();

    const query = `
      ${dropTables}
      ${dropTypes}
      ${createTypes}
      ${createTables}
      ${seeders}
    `;

    await connectString.query(query);

    connectString.end();
  } catch (err) {
    console.log(err);
    await connectString.end();
  }
};
setupDB();
