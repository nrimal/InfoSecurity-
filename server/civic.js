const civicSip = require('civic-sip-api');
const config = require('../config');
let db = require('./queries');

const civicClient = civicSip.newClient({
    appId: config.civic.appId,
    prvKey: config.civic.prvKey,
    appSecret: config.civic.appSecret,
  });

  module.exports = {
      exchangeCode: function(jwtToken){
        return new Promise((resolve, reject) => {
            civicClient.exchangeCode(jwtToken)
            .then((userData) => {
                resolve(userData.userId);
            }).catch((err) => {
                reject(err);
            });
        })
      }
  }