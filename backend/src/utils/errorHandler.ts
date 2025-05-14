import { GraphQLError } from 'graphql';

export function errorHandler(err: GraphQLError) {
  // hide stack traces in production, map certain errors to codes, etc.
  return {
    message: err.message,
    code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
  };
}
