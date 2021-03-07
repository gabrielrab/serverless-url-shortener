const error = require('../utils/errors');

module.exports.success = (body = {}, status = 200, extraHeaders) => {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...extraHeaders,
    },
    body:
      body != null
        ? JSON.stringify(body.stack ? body.stack : body)
        : '',
  };
};

module.exports.error = (type, datails, context) => {
  return {
    statusCode:
      error[type].status || error.UnexpectedException.status,
    body: JSON.stringify({
      message:
        error[type].defaultMessage ||
        error.UnexpectedException.status,
      datails: datails || {},
      functionName: (context && context.functionName) || '',
    }),
  };
};
