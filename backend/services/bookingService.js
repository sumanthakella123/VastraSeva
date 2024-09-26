// backend/services/bookingService.js

const {
    PutCommand,
    QueryCommand,
  } = require('@aws-sdk/lib-dynamodb');
  const dynamoDBDocumentClient = require('./dynamoClient');
  
  const BOOKING_TABLE = 'Bookings';
  
  const BookingService = {
    async createBooking(booking) {
      const params = {
        TableName: BOOKING_TABLE,
        Item: booking,
      };
      const command = new PutCommand(params);
      await dynamoDBDocumentClient.send(command);
      return booking;
    },
  
    async getBookingsByUserId(userId) {
      const params = {
        TableName: BOOKING_TABLE,
        IndexName: 'UserIdIndex', // Ensure you have created this GSI
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      };
      const command = new QueryCommand(params);
      const result = await dynamoDBDocumentClient.send(command);
      return result.Items;
    },
  
    // Add more booking-related methods as needed
  };
  
  module.exports = BookingService;
  