const generatePolicy = require('../utils/generatepolicy');

module.exports.masterKey = (event, context, callback) => {
  if (
    !(
      event.authorizationToken &&
      event.authorizationToken.split(' ')[1] ===
        process.env.MASTER_KEY
    )
  ) {
    callback('Unauthorized');
  }
  callback(
    null,
    generatePolicy(
      { id: 1, name: 'MasterKeyUser' },
      'Allow',
      event.methodArn,
    ),
  );
};
