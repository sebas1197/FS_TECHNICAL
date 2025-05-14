import mongoose from 'mongoose';
import winston from 'winston';

export async function connectDB(uri: string) {
  try {
    await mongoose.connect(uri);
    winston.info('MongoDB connected');
  } catch (error) {
    winston.error('MongoDB connection error', error);
    process.exit(1);
  }
}
