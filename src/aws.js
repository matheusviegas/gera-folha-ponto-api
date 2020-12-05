const AWS = require('aws-sdk');
const { v4 } = require('uuid');

AWS.config.update({ region: 'us-east-1' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const sendMessage = async (messageBody) => {
  return new Promise((resolve, reject) => {
    const params = {
      MessageBody: JSON.stringify(messageBody),
      MessageDeduplicationId: v4(),
      MessageGroupId: process.env.MESSAGE_GROUP_ID,
      QueueUrl: process.env.QUEUE_URL,
    };

    sqs.sendMessage(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { sendMessage };
