import path from 'path';
import { fileURLToPath } from 'url';

import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';

import config from '../utils/config.js';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sequelize = new Sequelize(config.DATABASE_URL);

const migrationConf = {
  migrations: {
    glob: `${__dirname}/migrations/*.js`,
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  logger.info('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};

const command = process.argv[2];
const main = async () => {
  switch (command) {
    case 'migrate':
      logger.info('Running migrations...');
      await runMigrations();
      sequelize.close();
      break;
    case 'rollback':
      logger.info('Rolling back migration...');
      await rollbackMigration();
      sequelize.close();
      break;
    default:
      logger.error("Invalid command. Use 'migrate' or 'rollback'.");
      sequelize.close();
  }
  process.exit(0);
};

main();
