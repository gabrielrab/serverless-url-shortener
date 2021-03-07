module.exports = (query) => {
  const filterExpression = Object.keys(query)
    .map((key) => `#${key} = :${key}`)
    .toString()
    .replace(',', ' and ');

  let expressionAttributeNames = {};
  Object.keys(query).map(
    (key) =>
      (expressionAttributeNames = {
        [`#${key}`]: key,
        ...expressionAttributeNames,
      }),
  );

  let expressionAttributeValues = {};
  Object.keys(query).map(
    (key) =>
      (expressionAttributeValues = {
        [`:${key}`]: query[key],
        ...expressionAttributeValues,
      }),
  );

  return {
    filterExpression,
    expressionAttributeNames,
    expressionAttributeValues,
  };
};
