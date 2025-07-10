import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

import logger from '../utils/logger.js';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL);
export const postgresConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};
