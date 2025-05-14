import { BalanceService } from '../../src/services/BalanceService';
import { ReeApiService } from '../../src/services/ReeApiService';
import { BalanceRepository } from '../../src/repositories/BalanceRepository';

jest.mock('../../src/services/ReeApiService');
jest.mock('../../src/repositories/BalanceRepository');

const MockApi = ReeApiService as jest.MockedClass<typeof ReeApiService>;
const MockRepo = BalanceRepository as jest.MockedClass<typeof BalanceRepository>;

describe('BalanceService', () => {
  let svc: BalanceService;
  let api: jest.Mocked<ReeApiService>;
  let repo: jest.Mocked<BalanceRepository>;
  const samplePayload = {
    included: [
      {
        groupId: 'G1',
        type: 'T1',
        attributes: {
          content: [
            { attributes: { values: [{ datetime: '2020-01-01T00:00:00Z', value: 10, percentage: 0.5 }] } }
          ]
        }
      }
    ]
  };

  beforeEach(() => {
    api = new MockApi();
    repo = new MockRepo();
    repo.lastFetchDatetime.mockResolvedValue(null);
    api.fetchBalance.mockResolvedValue(samplePayload as any);
    svc = new BalanceService(api, repo);
  });

  it('calls repository.saveMany with transformed records', async () => {
    const count = await svc.updateDailyBalance();
    expect(api.fetchBalance).toHaveBeenCalled();
    expect(repo.saveMany).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ groupId: 'G1', type: 'T1', value: 10, percentage: 0.5 })
      ])
    );
    expect(count).toBe(1);
  });

  it('delegates date-range queries to the repository', async () => {
    const fake = [{ datetime: new Date(), groupId: 'G1', type: 'T1', value: 1, percentage: 0.1 }];
    repo.findByDateRange.mockResolvedValue(fake as any);
    const result = await svc.getByDateRange('2020-01-01', '2020-01-02');
    expect(repo.findByDateRange).toHaveBeenCalledWith(new Date('2020-01-01'), new Date('2020-01-02'));
    expect(result).toBe(fake);
  });
});
