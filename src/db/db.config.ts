import { Sequelize } from 'sequelize';

import { DB_CONNECTION_URI } from '../consts/secret.const';

const databaseConnectionUri = String(
  DB_CONNECTION_URI 
);
const sequelize = new Sequelize(databaseConnectionUri);

export default sequelize;
