import logger from '../utils/logger.js';
const postgresErrorHandler = (err, _req, res, next) => {
  logger.error(err.message);
  if (
    err.name === 'SequelizeConnectionError' ||
    err.name === 'SequelizeConnectionRefusedError'
  ) {
    return res.status(500).json({ error: 'Database connection error' });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: 'Duplicate entry error' });
  } else if (err.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .json({ error: 'Validation error', details: err.errors });
  } else if (err.name === 'SequelizeDatabaseError') {
    return res
      .status(500)
      .json({ error: 'Database error', details: err.message });
  }
  next(err);
};

export default postgresErrorHandler;
