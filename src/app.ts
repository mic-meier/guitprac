import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';

import schema from './modules/index';

const server = new ApolloServer({
  schema,
});

const app = express();

server.applyMiddleware({ app, path: '/api' });

export default app;
