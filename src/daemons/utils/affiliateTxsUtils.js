import { Queue } from 'bullmq';
import { config } from 'dotenv';

config()

const redisConfig = {
  host: process.env.REDIS_HOST,
  port: 6379,
  password: process.env.REDIS_PASSWORD || 'redis_password',
};

const affiliateWithdrawQueue = new Queue('affiliate-withdrawals', {
  connection: redisConfig,
});

export const queueAffiliateWithdrawal = async (affiliateId) => {
  if (!affiliateId) throw new Error('Affiliate ID is required');

  const job = await affiliateWithdrawQueue.add(
    'withdraw', // Job name
    { affiliateId },
    {
      jobId: `withdraw-${affiliateId}-${Date.now()}`,
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: true,
      removeOnFail: false,
    }
  );

  console.log(`Queued withdrawal for affiliate ${affiliateId}, job ID: ${job.id}`);
  return job.id;
};

export const closeQueueClient = async () => {
  await affiliateWithdrawQueue.close();
};