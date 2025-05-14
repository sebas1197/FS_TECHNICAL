import { gql } from '@apollo/client';

export const BALANCE_BY_DATE_RANGE = gql`
  query BalanceByDateRange($start: Date!, $end: Date!) {
    balanceByDateRange(start: $start, end: $end) {
      datetime
      groupId
      type
      value
      percentage
    }
  }
`;
