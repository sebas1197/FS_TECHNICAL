import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { errorHandler } from './utils/errorHandler';

export async function createApp() {
  const app = express();
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: errorHandler,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  return app;
}
