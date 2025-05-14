import { ReeApiService } from './ReeApiService';
import { BalanceRepository } from '../repositories/BalanceRepository';

export class BalanceService {
  constructor(
    private apiSvc = new ReeApiService(),
    private repo   = new BalanceRepository()
  ) {}

  async updateDailyBalance() {
    const last = await this.repo.lastFetchDatetime();
    const start = last
      ? last.toISOString()
      : '2019-01-01T00:00:00.000Z';
    const end = new Date().toISOString();

    const payload = await this.apiSvc.fetchBalance(start, end);
    const records = payload.included.flatMap((group: any) =>
      group.attributes.content.map((item: any) => ({
        datetime: new Date(item.attributes.values[0].datetime),
        groupId: item.groupId,
        type: item.type,
        value: item.attributes.values[0].value,
        percentage: item.attributes.values[0].percentage,
      }))
    );

    await this.repo.saveMany(records);
    return records.length;
  }

  async getByDateRange(start: string, end: string) {
    return this.repo.findByDateRange(new Date(start), new Date(end));
  }
}
