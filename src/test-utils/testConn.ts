import mongoose from 'mongoose';
import config from '../config';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  promiseLibrary: global.Promise,
};

export const testConn = async (drop = false): Promise<typeof mongoose> => {
  const connection = await mongoose.connect(
    config.MONGODB_URI,
    mongooseOptions,
  );
  if (drop) {
    await mongoose.connection.db.dropDatabase();
  }
  return connection;
};
