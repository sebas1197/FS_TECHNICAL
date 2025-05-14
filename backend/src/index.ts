import { config } from 'dotenv';
import { createApp } from './app';
import { connectDB } from './config/db';
import { Scheduler } from './services/Scheduler';
import * as dotenv from 'dotenv';
dotenv.config();

config();  // load MONGODB_URI, PORT, etc.

async function bootstrap() {
  await connectDB(process.env.MONGODB_URI!);
  const app = await createApp();

  // Start scheduler
  new Scheduler().start();

  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/graphql`);
  });
}

bootstrap();
