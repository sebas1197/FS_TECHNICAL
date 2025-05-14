import axios from 'axios';
import winston from 'winston';

export class ReeApiService {
  private endpoint = 'https://apidatos.ree.es/es/datos/balance/balance-electrico';

  async fetchBalance(start: string, end: string) {
    try {
      const { data } = await axios.get(this.endpoint, {
        params: { start_date: start, end_date: end, time_trunc: 'day' },
        timeout: 10_000,
      });
      return data;
    } catch (err) {
      winston.warn('REE API fetch failed, falling back', err);
      throw new Error('External API unavailable');
    }
  }
}
