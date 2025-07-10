import app from './app.js';
import { postgresConnection } from './db/postgres.js';
import config from './utils/config.js';
import logger from './utils/logger.js';

const startServer = async () => {
  try {
    await postgresConnection();
    app.listen(config.PORT, () => {
      logger.info(`Server is running on http://localhost:${config.PORT}`);
    });
  } catch {
    process.exit(1);
  }
};

startServer();
