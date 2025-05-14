import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type BalanceRecord {
    datetime: Date!
    groupId: String!
    type: String!
    value: Float!
    percentage: Float!
  }

  type Query {
    balanceByDateRange(start: Date!, end: Date!): [BalanceRecord!]!
  }
`;
