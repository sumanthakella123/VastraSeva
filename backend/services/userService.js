// backend/services/userService.js

const {
    GetCommand,
    PutCommand,
    QueryCommand,
  } = require('@aws-sdk/lib-dynamodb');
  const dynamoDBDocumentClient = require('./dynamoClient');
  
  const USER_TABLE = 'Users';
  
  const UserService = {
    async getUserById(id) {
      const params = {
        TableName: USER_TABLE,
        Key: { id },
      };
      const command = new GetCommand(params);
      const result = await dynamoDBDocumentClient.send(command);
      return result.Item;
    },
  
    async createUser(user) {
      const params = {
        TableName: USER_TABLE,
        Item: user,
      };
      const command = new PutCommand(params);
      await dynamoDBDocumentClient.send(command);
      return user;
    },
  
    // Add more user-related methods as needed
  };
  
  module.exports = UserService;
  