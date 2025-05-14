import { BalanceService } from '../services/BalanceService';

const balanceSvc = new BalanceService();

export const resolvers = {
  Query: {
    balanceByDateRange: async (_: any, { start, end }: { start: string; end: string }) => {
      return balanceSvc.getByDateRange(start, end);
    },
  },
  Date: {
    // use GraphQL ISO-date scalar or implement serialize/parse
    __serialize: (value: Date) => value.toISOString(),
    __parseValue: (value: string) => new Date(value),
    __parseLiteral: (ast: any) => new Date(ast.value),
  },
};
