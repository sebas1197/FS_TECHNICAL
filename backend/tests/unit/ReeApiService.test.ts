import axios from 'axios';
import { ReeApiService } from '../../src/services/ReeApiService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ReeApiService', () => {
  const svc = new ReeApiService();

  it('fetches data successfully', async () => {
    const fake = { data: { foo: 'bar' } };
    mockedAxios.get.mockResolvedValueOnce(fake);

    const result = await svc.fetchBalance('start', 'end');
    expect(result).toEqual(fake.data);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://apidatos.ree.es/es/datos/balance/balance-electrico',
      expect.objectContaining({ params: expect.any(Object), timeout: 10000 })
    );
  });

  it('throws a standardized error when the API fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('network'));
    await expect(svc.fetchBalance('a', 'b'))
      .rejects
      .toThrow('External API unavailable');
  });
});
