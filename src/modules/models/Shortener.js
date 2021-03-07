const { attributes } = require('structure');
const { v4: uuidv4 } = require('uuid');

const Shortener = attributes({
  id: {
    type: String,
    default: (instance) => instance.makeUuid(),
  },
  short: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: (instance) => instance.makeDate(),
  },
})(
  class Shortener {
    makeUuid() {
      return uuidv4();
    }

    makeDate() {
      return new Date().toISOString();
    }
  },
);

module.exports = Shortener;
