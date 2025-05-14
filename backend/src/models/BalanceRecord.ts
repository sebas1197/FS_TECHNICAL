import { Schema, model, Document } from 'mongoose';

export interface IBalanceRecord extends Document {
  datetime: Date;
  groupId: string;
  type: string;
  value: number;
  percentage: number;
}

const BalanceRecordSchema = new Schema<IBalanceRecord>({
  datetime: { type: Date, required: true, index: true },
  groupId:   { type: String, required: true },
  type:      { type: String, required: true },
  value:     { type: Number, required: true },
  percentage:{ type: Number, required: true },
});

export const BalanceRecord = model<IBalanceRecord>('BalanceRecord', BalanceRecordSchema);
