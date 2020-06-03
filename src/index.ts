import mongoose from 'mongoose';
import url from 'url';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import config from './config';
import { redis } from './redis';
import { createSchema } from './utils/createSchema';

const startServer = async function () {
  const mongoHost = new url.URL(config.MONGODB_URI).host;
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    promiseLibrary: global.Promise,
  };

  // const schema = await buildSchema({
  //   resolvers: [__dirname + '/modules/**/*.ts'],
  // });

  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: 'http;//localhost:3000',
    }),
  );

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    }),
  );

  server.applyMiddleware({ app, path: '/api' });

  try {
    await Promise.all([
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
