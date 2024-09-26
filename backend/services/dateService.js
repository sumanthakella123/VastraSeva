// backend/services/dateService.js

const {
    PutCommand,
    QueryCommand,
    UpdateCommand,
    GetCommand,
  } = require('@aws-sdk/lib-dynamodb');
  const dynamoDBDocumentClient = require('./dynamoClient');
  
  const DATE_TABLE = 'Dates';
  
  const DateService = {
    async getDatesByDeity(deity) {
      const params = {
        TableName: DATE_TABLE,
        IndexName: 'DeityIndex', // Ensure you have created this GSI
        KeyConditionExpression: 'deity = :deity',
        ExpressionAttributeValues: {
          ':deity': deity,
        },
      };
      const command = new QueryCommand(params);
      const result = await dynamoDBDocumentClient.send(command);
      return result.Items;
    },
  
    async getDateByDeityAndDate(deity, date) {
      const params = {
        TableName: DATE_TABLE,
        Key: {
          id: `${deity}#${date}`,
        },
      };
      const command = new GetCommand(params);
      const result = await dynamoDBDocumentClient.send(command);
      return result.Item;
    },
  
    async initializeDates(dates) {
      const putRequests = dates.map((date) => ({
        PutRequest: {
          Item: date,
        },
      }));
  
      const params = {
        RequestItems: {
          [DATE_TABLE]: putRequests,
        },
      };
  
      // DynamoDB batchWrite can only handle 25 items at a time
      const batches = [];
      while (putRequests.length) {
        batches.push(putRequests.splice(0, 25));
      }
  
      for (const batch of batches) {
        const batchParams = {
          RequestItems: {
            [DATE_TABLE]: batch,
          },
        };
        await dynamoDBDocumentClient.send(new BatchWriteCommand(batchParams));
      }
    },
  
    async updateDateStatus(deity, date, status, bookingId) {
      const params = {
        TableName: DATE_TABLE,
        Key: {
          id: `${deity}#${date}`,
        },
        UpdateExpression: 'SET #status = :status, bookingId = :bookingId',
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        ExpressionAttributeValues: {
          ':status': status,
          ':bookingId': bookingId,
        },
      };
      const command = new UpdateCommand(params);
      await dynamoDBDocumentClient.send(command);
    },
  
    // Add more date-related methods as needed
  };
  
  module.exports = DateService;
  