import { config } from 'dotenv';
import mongoose from 'mongoose';
import { Queue, RedisConnection, Worker } from 'bullmq';
import { createClient } from 'redis';
import { withdrawAffiliateEarnings } from '../services/paymentService.js'
import IORedis from 'ioredis';

config();

config();

// Log environment variables
console.log('REDIS_HOST loaded:', process.env.REDIS_HOST);
console.log('REDIS_PORT loaded:', process.env.REDIS_PORT);
console.log('REDIS_PASSWORD loaded:', process.env.REDIS_PASSWORD);

// Redis setup
const redis = new IORedis({
  host: process.env.REDIS_HOST || "redis-test",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD || "redis_password",
  maxRetriesPerRequest: null
});
redis.on("connect", () => console.log("Redis connected for middleware"));
redis.on("error", (err) => console.error("Redis error in middleware:", err));

// Test the connection
redis.ping().then((result) => {
  console.log('IORedis PING result:', result);
}).catch((err) => {
  console.error('IORedis PING failed:', err);
});

// BullMQ queue using ioredis
const affiliateWithdrawQueue = new Queue('affiliate-withdrawals', {
  connection: redis,
});

// Worker setup using the same ioredis instance
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
  {
    connection: redis, // Use the same ioredis instance
  }
);

worker.on('ready', () => {
  console.log('Worker is ready with connection:', JSON.stringify(redisConfig));
});

worker.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed for affiliate ${job.data.affiliateId}`, result);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed for affiliate ${job.data.affiliateId} after retries`, err.message);
});

worker.on('error', (err) => {
  console.error('Worker error:', err);
});

// Custom lock functions using ioredis
const acquireLock = async (key, ttl = 60000) => {
  const result = await redis.set(key, 'locked', 'NX', 'PX', ttl);
  return result === 'OK';
};

const releaseLock = async (key) => {
  await redis.del(key);
};

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

console.log('Affiliate withdrawal worker started');
process.on('SIGINT', async () => {
  await worker.close();
  await affiliateWithdrawQueue.close();
  await redis.quit();
  process.exit(0);
});
