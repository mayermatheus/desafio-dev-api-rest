import { createConnection, getConnection } from 'typeorm';

// import logger from '../../config/logger-config';

const nameDb = (process.env.NODE_ENV === 'prod' && 'prod') || 'default';

export const startConnection = async () => {
  await createConnection(nameDb)
    .then(() => console.log('Database connection started.'))
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
};

export const closeConnection = () => getConnection(nameDb).close();
