import moment from 'moment-timezone'

export const log = async (level, message, context = {}) => {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${Object.keys(context).length ? JSON.stringify(context) : ''}`;
    console.log(logMessage);
    // In the future, replace console.log with Winston or other logging library
};