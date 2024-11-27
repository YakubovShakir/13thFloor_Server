// import crypto from "crypto"
// import querystring from "querystring"

// function validateInitData(initData, botToken) {
//     const vals = querystring.parse(initData);

//     const dataCheckString = Object.keys(vals)
//         .filter(key => key !== 'hash')
//         .sort()
//         .map(key => ${key}=${decodeURIComponent(vals[key])})
//         .join('\n');

//     const secretKey = crypto.createHmac('sha256', 'WebAppData')
//         .update(botToken)
//         .digest();

//     const hmac = crypto.createHmac('sha256', secretKey)
//         .update(dataCheckString)
//         .digest('hex');

//     return hmac === vals['hash'];
// }

// // const initData = 'param1=value1&param2=value2&hash=some_hash_value';
// // const botToken = '';

// // export const isValid = validateInitData(initData, botToken);
// console.log(isValid);
