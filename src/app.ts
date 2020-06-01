import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import schema from './modules/index';
import config from './config';
import { redis } from './redis';

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
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

export default app;
