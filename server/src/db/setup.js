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
    console.log('Database setup successfully');
    connectString.end();
  } catch (err) {
    console.log(err);
    await connectString.end();
  }
};
setupDB();
