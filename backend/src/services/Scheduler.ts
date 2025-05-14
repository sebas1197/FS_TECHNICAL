import { CronJob } from 'cron';
import { BalanceService } from './BalanceService';
import winston from 'winston';

export class Scheduler {
  constructor(private balanceSvc = new BalanceService()) {}

  public start() {
    const job = new CronJob('5 0 * * *', async () => {
      try {
        const count = await this.balanceSvc.updateDailyBalance();
        winston.info(`Fetched & stored ${count} balance records`);
      } catch (err) {
        winston.error('Scheduled update failed', err);
      }
    }, null, true, 'UTC');
    job.start();
  }
}
