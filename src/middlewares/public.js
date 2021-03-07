const generatePolicy = require('../utils/generatepolicy');

module.exports.public = (event, context, callback) => {
  callback(
    null,
    generatePolicy(
      { id: 1, name: 'Guest' },
      'Allow',
      event.methodArn,
    ),
  );
};
