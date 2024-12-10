// import { Bot } from 'grammy';
// import { connect } from 'mongoose';
// import { createWriteStream } from 'fs';
// import { join } from 'path';
// import { config } from 'dotenv';
// import Users from './models/userModel.mjs'
// import Referrals from './models/referralModel.mjs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// config()

// // Streaming JSON writer (unchanged from previous version)
// class StreamingJSONWriter {
//     constructor(filename) {
//         this.stream = createWriteStream(filename, { flags: 'a' });
//         this.isFirstWrite = true;
//         this.stream.write('[\n');
//     }

//     write(data) {
//         if (!this.isFirstWrite) {
//             this.stream.write(',\n');
//         }
//         this.stream.write(JSON.stringify(data));
//         this.isFirstWrite = false;
//     }

//     end() {
//         this.stream.write('\n]');
//         this.stream.end();
//     }
// }

// // Rate limiting and queue management (unchanged from previous version)
// class TelegramRateLimiter {
//     constructor(maxConcurrent = 30, interval = 1000) {
//         this.queue = [];
//         this.running = 0;
//         this.maxConcurrent = maxConcurrent;
//         this.interval = interval;
//     }

//     async enqueue(task) {
//         return new Promise((resolve, reject) => {
//             this.queue.push({ task, resolve, reject });
//             this.processQueue();
//         });
//     }

//     async processQueue() {
//         while (this.running < this.maxConcurrent && this.queue.length > 0) {
//             const { task, resolve, reject } = this.queue.shift();
//             this.running++;

//             try {
//                 const result = await task();
//                 resolve(result);
//             } catch (error) {
//                 if (error.description && error.description.includes('Too Many Requests')) {
//                     await new Promise(r => setTimeout(r, 5000));
//                     this.queue.unshift({ task, resolve, reject });
//                 } else {
//                     reject(error);
//                 }
//             } finally {
//                 this.running--;
//                 await new Promise(r => setTimeout(r, this.interval));
//                 this.processQueue();
//             }
//         }
//     }
// }

// async function main() {
//     console.time('Total Execution Time');
    
//     // Connect to database with optimized settings
//     await connect(process.env.MONGO_URI, {
//         maxPoolSize: 50,
//         socketTimeoutMS: 45000,
//         serverSelectionTimeoutMS: 45000
//     });

//     // Initialize bot and rate limiter
//     const bot = new Bot('7866433891:AAHAh-4Lc0Dvr80URgOQMJrIKB_1bfxc0KM');
//     const rateLimiter = new TelegramRateLimiter();
    
//     // Prepare tracking variables
//     let subscribedCount = 0;
//     let totalUsersWithFiveRefs = 0;
//     let subscribedUsersWithFiveRefs = 0;

//     console.log('Starting user processing...');
    
//     // Fetch users with minimal query
//     const users = await Users.find({}, { id: 1 });
//     console.log(`Total users to process: ${users.length}`);

//     // Prepare streaming writers
//     const timestamp = new Date().toISOString().replace(/:/g, '-');
//     const resultsWriter = new StreamingJSONWriter(join(__dirname, `results_${timestamp}.json`));
//     const summaryStream = createWriteStream(join(__dirname, `summary_${timestamp}.json`));

//     // Process users in controlled batches
//     const batchSize = 30;
//     for (let i = 0; i < users.length; i += batchSize) {
//         const batch = users.slice(i, i + batchSize);
        
//         // Use rate-limited concurrent processing
//         await Promise.all(batch.map(async (user) => {
//             return rateLimiter.enqueue(async () => {
//                 try {
//                     // Concurrent referral, subscription, and bot status checks
//                     const [refs, isInChannel, botStatus] = await Promise.all([
//                         Referrals.countDocuments({ refer_id: user.id }),
//                         checkSubscription(bot, user.id, '-1002323702022'),
//                     ]);

//                     // Prepare result object
//                     const result = {
//                         userId: user.id,
//                         referralCount: refs,
//                         isSubscribed: isInChannel,
//                         isBotBlocked: botStatus === 'blocked'
//                     };

//                     // Immediately write result to file
//                     resultsWriter.write(result);

//                     // Progress tracking
//                     process.stdout.write(`Processed: ${i + 1}/${users.length} users\r`);

//                     // Update aggregate stats
//                     if (refs >= 5) {
//                         totalUsersWithFiveRefs++;
//                         if (isInChannel) {
//                             subscribedUsersWithFiveRefs++;
//                         }
//                     }
//                     if (isInChannel) subscribedCount++;

//                     return result;
//                 } catch (error) {
//                     console.error(`Error processing user ${user.id}:`, error);
//                     return null;
//                 }
//             });
//         }));

//         // Additional small delay between batches to be extra cautious
//         await new Promise(r => setTimeout(r, 1000));
//     }

//     // Finalize results writing
//     resultsWriter.end();

//     // Calculate percentages
//     const percentUsersWithFiveRefs = (totalUsersWithFiveRefs / users.length) * 100;
//     const percentSubscribedUsersWithFiveRefs = (subscribedUsersWithFiveRefs / users.length) * 100;

//     // Prepare final summary
//     const summary = {
//         totalUsers: users.length,
//         subscribedUsers: subscribedCount,
//         usersWithFiveRefs: totalUsersWithFiveRefs,
//         subscribedUsersWithFiveRefs: subscribedUsersWithFiveRefs,
//         percentUsersWithFiveRefs: percentUsersWithFiveRefs.toFixed(2),
//         percentSubscribedUsersWithFiveRefs: percentSubscribedUsersWithFiveRefs.toFixed(2),
//     };

//     // Write summary to file
//     summaryStream.write(JSON.stringify(summary, null, 2));
//     summaryStream.end();

//     // Console output
//     console.log('\n--- Processing Complete ---');
//     console.log(JSON.stringify(summary, null, 2));
//     console.timeEnd('Total Execution Time');
// }

// async function checkSubscription(bot, userId, channelId) {
//     try {
//         const chatMember = await bot.api.getChatMember(channelId, userId);
//         const activeStatuses = ['member', 'administrator', 'creator'];
//         return activeStatuses.includes(chatMember.status);
//     } catch (error) {
//         // Specific error handling for Telegram API
//         if (error.description) {
//             if (error.description.includes('Too Many Requests')) {
//                 console.warn(`Rate limited when checking subscription for user ${userId}`);
//                 await new Promise(r => setTimeout(r, 5000)); // Wait before retrying
//             }
//             if (error.description.includes('User not found') || 
//                 error.description.includes('Chat not found')) {
//                 return false;
//             }
//         }
//         return false;
//     }
// }

// // Error handling and execution
// main().catch(console.error);


import fs from 'fs';
import path from 'path';

function generateSummary(resultsFilePath) {
    // Read the results file
    const rawData = fs.readFileSync(resultsFilePath, 'utf-8');
    const results = JSON.parse(rawData);

    // Initialize summary metrics
    const summary = {
        totalUsers: results.length,
        subscribedUsers: 0,
        referralBreakdown: {},
    };

    // Process each user record
    results.forEach(user => {
        // Count subscribed users
        if (user.isSubscribed) {
            summary.subscribedUsers++;
        }

        // Referral count breakdown
        const refCount = user.referralCount;
        summary.referralBreakdown[refCount] = 
            (summary.referralBreakdown[refCount] || 0) + 1;
    });

    // Calculate percentages
    summary.percentSubscribed = 
        (summary.subscribedUsers / summary.totalUsers * 100).toFixed(5);

    // Categorize referral performance
    summary.referralPerformance = {
        noReferrals: summary.referralBreakdown[0] || 0,
        lowReferrals: Object.entries(summary.referralBreakdown)
            .filter(([count]) => parseInt(count) > 0 && parseInt(count) < 5)
            .reduce((sum, [_, count]) => sum + count, 0),
        highReferrals: Object.entries(summary.referralBreakdown)
            .filter(([count]) => parseInt(count) >= 5)
            .reduce((sum, [_, count]) => sum + count, 0)
    };

    // Detailed referral distribution
    summary.referralDistribution = Object.entries(summary.referralBreakdown)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .map(([count, userCount]) => ({
            referralCount: parseInt(count),
            userCount,
            percentage: (userCount / summary.totalUsers * 100).toFixed(5)
        }));

    // Prepare output file
    const outputPath = path.join(
        path.dirname(resultsFilePath), 
        `detailed_summary_${new Date().toISOString().replace(/:/g, '-')}.json`
    );

    // Write detailed summary
    fs.writeFileSync(outputPath, JSON.stringify(summary, null, 2));

    // Optional: Console output for quick review
    console.log('Summary Generated:', JSON.stringify({
        totalUsers: summary.totalUsers,
        subscribedUsers: summary.subscribedUsers,
        percentSubscribed: summary.percentSubscribed,
        percentBotBlocked: summary.percentBotBlocked
    }, null, 2));

    return summary;
}

// Usage
const resultsFilePath = process.argv[2] || __dirname + '/res.json';
generateSummary(resultsFilePath);