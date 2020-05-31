import mongoose from 'mongoose';
import url from 'url';
import app from './app';
import config from './config';

const mongoHost = new url.URL(config.MONGODB_URI).host;

const startServer = async function () {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    promiseLibrary: global.Promise,
  };

  try {
    await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      mongoose.connect(config.MONGODB_URI, mongooseOptions),
      app.listen(config.PORT),
    ]);

    console.log(
      `Server has started on port: ${config.PORT}, connected to mongo at ${mongoHost}`,
    );
  } catch (e) {
    console.error(`Could not start the app: `, e);
  }
};

void startServer();
