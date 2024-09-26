// backend/services/dynamoClient.js

const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { dynamoDBClient } = require('../aws-config');

// Create the DynamoDB Document Client
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

module.exports = dynamoDBDocumentClient;
