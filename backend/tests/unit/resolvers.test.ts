import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../../src/graphql/typeDefs';
import { resolvers } from '../../src/graphql/resolvers';

describe('GraphQL Resolvers', () => {
  let server: ApolloServer;

  beforeAll(() => {
    server = new ApolloServer({ typeDefs, resolvers });
  });

  it('balanceByDateRange returns data from BalanceService', async () => {
    const svcProto = require('../../src/services/BalanceService').BalanceService.prototype;
    const spy = jest.spyOn(svcProto, 'getByDateRange')
      .mockResolvedValue([{ datetime: new Date(), groupId: 'G', type: 'T', value: 5, percentage: 0.2 }]);

    const res = await server.executeOperation({
      query: `
        query GetBalance($start: Date!, $end: Date!) {
          balanceByDateRange(start: $start, end: $end) {
            groupId
            type
            value
            percentage
          }
        }
      `,
      variables: { start: '2020-01-01', end: '2020-01-02' }
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.balanceByDateRange).toHaveLength(1);
    expect(res.data?.balanceByDateRange[0]).toMatchObject({ groupId: 'G', type: 'T', value: 5 });
    spy.mockRestore();
  });
});
