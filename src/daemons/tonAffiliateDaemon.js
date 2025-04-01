import { Queue, Worker } from 'bullmq';
import { createClient } from 'redis';
import { withdrawAffiliateEarnings } from '../services/paymentService.js';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: 6379,
  password: process.env.REDIS_PASSWORD || 'redis_password',
};

const redisClient = createClient(redisConfig);
redisClient.connect().catch((err) => console.error('Redis client connection error:', err));
mongoose.connect(process.env.MONGO_URI, { directConnection: true }).catch((err) => console.error('Mongodb client connection error:', err));



// Custom lock functions
const acquireLock = async (key, ttl = 60000) => {
  const result = await redisClient.set(key, 'locked', { NX: true, PX: ttl });
  return result === 'OK';
};

const releaseLock = async (key) => {
  await redisClient.del(key);
};

// BullMQ queue
const affiliateWithdrawQueue = new Queue('affiliate-withdrawals', {
  connection: redisConfig,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

// Worker to process jobs
const worker = new Worker(
  'affiliate-withdrawals',
  async (job) => {
    const { affiliateId } = job.data;
    const lockKey = `withdraw-lock:${affiliateId}`;
    let lockAcquired = false;

    try {
      lockAcquired = await acquireLock(lockKey, 60000);
      if (!lockAcquired) {
        throw new Error(`Failed to acquire lock for affiliate ${affiliateId} - withdrawal already in progress`);
      }
      console.log(`Acquired lock for affiliate ${affiliateId}`);

      await withdrawAffiliateEarnings(affiliateId);

      console.log(`Withdrawal completed for affiliate ${affiliateId}:`, result);
      return result;
    } catch (error) {
      console.error(`Withdrawal failed for affiliate ${affiliateId}:`, error.message);
      throw error;
    } finally {
      if (lockAcquired) {
        await releaseLock(lockKey);
        console.log(`Released lock for affiliate ${affiliateId}`);
      }
    }
  },
  { connection: redisConfig }
);

worker.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed for affiliate ${job.data.affiliateId}`, result);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed for affiliate ${job.data.affiliateId} after retries`, err.message);
});

worker.on('error', (err) => {
  console.error('Worker error:', err);
});

console.log('Affiliate withdrawal worker started');
process.on('SIGINT', async () => {
  await worker.close();
  await affiliateWithdrawQueue.close();
  await redisClient.quit();
  process.exit(0);
});