import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { BALANCE_BY_DATE_RANGE } from '../graphql/queries';
import { DateRangePicker } from '../components/DateRangePicker';
import { BalanceChart } from '../components/BalanceChart';
import { BalanceTable } from '../components/BalanceTable';
import { ErrorBanner } from '../components/ErrorBanner';
import type { BalanceRecord } from '../types';

export const Home: React.FC = () => {
  const [range, setRange] = useState<[Date,Date]>([
    new Date(Date.now() - 7*24*3600*1000),
    new Date()
  ]);

  const { data, loading, error, refetch } = useQuery<{ balanceByDateRange: BalanceRecord[] }>(
    BALANCE_BY_DATE_RANGE,
    {
      variables: {
        start: range[0].toISOString(),
        end:   range[1].toISOString()
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const onRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="container">
      <h1>REE Electric Balance</h1>
      <DateRangePicker
        start={range[0]} end={range[1]}
        onChange={(s,e)=>{ setRange([s,e]); refetch({ start:s.toISOString(), end:e.toISOString() }); }}
      />

      {loading && <p>Loading data…</p>}
      {error  && <>
        <ErrorBanner message={error.message} />
        <button onClick={onRetry}>Retry</button>
      </>}

      {data && (
        <>
          <BalanceChart data={data.balanceByDateRange} />
          <BalanceTable data={data.balanceByDateRange} />
        </>
      )}
    </div>
  );
};
