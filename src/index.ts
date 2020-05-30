// import 'reflect-metadata';
// import { ApolloServer } from 'apollo-server-express';
// import express from 'express';
// import { buildSchema, Resolver, Query } from 'type-graphql';

// @Resolver()
// class HelloResolver {
//   @Query(() => String)
//   helloWorld() {
//     return 'Hello World!';
//   }
// }

// const main = async () => {
//   const schema = await buildSchema({
//     resolvers: [HelloResolver],
//   });

//   const apolloServer = new ApolloServer({ schema });

//   const app = express();

//   apolloServer.applyMiddleware({ app });

//   app.listen(4000, () => {
//     console.log('server started on http://localhost:4000/graphql');
//   });
// };

// void main();

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
