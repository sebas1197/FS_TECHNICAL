import { BalanceRecord, IBalanceRecord } from '../models/BalanceRecord';

export class BalanceRepository {
  async saveMany(records: IBalanceRecord[]) {
    return BalanceRecord.insertMany(records, { ordered: false });
  }

  async findByDateRange(start: Date, end: Date) {
    return BalanceRecord.find({ datetime: { $gte: start, $lte: end } }).lean();
  }

  async lastFetchDatetime(): Promise<Date | null> {
    const doc = await BalanceRecord.findOne().sort({ datetime: -1 });
    return doc ? doc.datetime : null;
  }
}
