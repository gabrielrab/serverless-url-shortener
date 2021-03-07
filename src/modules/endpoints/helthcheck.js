const response = require('../../shared/response');

module.exports = {
  async helth() {
    return response.success(
      { status: 'Success', stage: process.env.STAGE },
      200,
    );
  },
};
