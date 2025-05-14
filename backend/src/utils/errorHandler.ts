import { GraphQLError } from 'graphql';

export function errorHandler(err: GraphQLError) {
  return {
    message: err.message,
    code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
  };
}
