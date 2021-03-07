const AWS = require('aws-sdk');
const queryBuilder = require('../utils/dynamoQueryBuilder');

AWS.config.update({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_URL,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  convertEmptyValues: true,
});
const dynamoClient = new AWS.DynamoDB.DocumentClient();

const repository = (table) => ({
  async list() {
    const { Items: list } = await dynamoClient
      .scan({
        TableName: table,
      })
      .promise();
    return list;
  },

  async getBy(query = {}) {
    const dynamoQuery = queryBuilder(query);
    const { Items: list } = await dynamoClient
      .scan({
        TableName: table,
        FilterExpression: dynamoQuery.filterExpression,
        ExpressionAttributeNames:
          dynamoQuery.expressionAttributeNames,
        ExpressionAttributeValues:
          dynamoQuery.expressionAttributeValues,
      })
      .promise();
    return list;
  },

  async create(data) {
    try {
      const createEntity = await dynamoClient
        .put({
          Item: data.toJSON(),
          TableName: table,
        })
        .promise();
      return createEntity;
    } catch (error) {
      throw new Error(error);
    }
  },

  async delete(key) {
    try {
      const entity = await dynamoClient
        .delete({
          TableName: table,
          Key: { id: key },
          ReturnValues: 'ALL_OLD',
        })
        .promise();
      return entity;
    } catch (error) {
      throw new Error(error);
    }
  },
});

module.exports = repository;
