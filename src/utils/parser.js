module.exports.parseToString = (obj) => {
  if (typeof obj == 'object') {
    return JSON.stringify(obj);
  } else {
    return obj;
  }
};

module.exports.parseToObject = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return {};
  }
};
