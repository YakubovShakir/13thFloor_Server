import { config } from 'dotenv';
import mongoose from 'mongoose';
import { Queue, Worker } from 'bullmq';
import { createClient } from 'redis';
import { withdrawAffiliateEarnings } from '../services/paymentService.js'

config();

// Log environment variables
console.log('REDIS_HOST loaded:', process.env.REDIS_HOST);
console.log('REDIS_PORT loaded:', process.env.REDIS_PORT);
console.log('REDIS_PASSWORD loaded:', process.env.REDIS_PASSWORD);

const redisConfig = {
  socket: {
    host: process.env.REDIS_HOST || 'redis-test',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
  password: process.env.REDIS_PASSWORD || 'redis_password',
};

// Log the config
console.log('Redis Config:', JSON.stringify(redisConfig));

// Standalone Redis client for locking
const redisClient = createClient(redisConfig);
redisClient.on('connect', () => {
  console.log('Standalone Redis client connected to:', redisConfig.socket.host);
});
redisClient.on('error', (err) => {
  console.error('Standalone Redis client error:', err);
});

await redisClient.connect();
const pingResult = await redisClient.ping();
console.log('Standalone Redis PING result:', pingResult);

// BullMQ queue
const affiliateWithdrawQueue = new Queue('affiliate-withdrawals', {
  connection: redisConfig,
});

// Worker setup with explicit connection
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

      const result = await withTransaction(async (session) => {
        return await withdrawAffiliateEarnings(affiliateId);
      });

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
  null,
  redisConfig
);

worker.on('ready', () => {
  console.log('Worker is ready with connection:', JSON.stringify(worker.opts.connection));
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

// Custom lock functions
const acquireLock = async (key, ttl = 60000) => {
  const result = await redisClient.set(key, 'locked', { NX: true, PX: ttl });
  return result === 'OK';
};

const releaseLock = async (key) => {
  await redisClient.del(key);
};

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

console.log('Affiliate withdrawal worker started');
process.on('SIGINT', async () => {
  await worker.close();
  await affiliateWithdrawQueue.close();
  await redisClient.quit();
  process.exit(0);
});