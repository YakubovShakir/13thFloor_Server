import { logger } from '../server.js';

export const log = (level, message, context = {}) => {
    logger[level]({ message, ...context })
};