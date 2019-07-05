import { Client } from 'pg';
import { dropTables, createTables } from './config/migrations';
import seeders from './config/seeders';
import getConfig from './config';

const config = getConfig();
const connectString = new Client(config);

connectString.connect();

const setupDB = async () => {
  try {
    const query = `
      ${dropTables}
      ${createTables}
      ${seeders}
    `;

    await connectString.query(query);

    connectString.end();
  } catch (err) {
    await connectString.end();
  }
};
setupDB();
