"use strict";
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const postsTable = process.env.POSTS_TABLE;

const response = (statusCode, message) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
};

module.exports.getCourseStats = (event, context, callback) => {
  const { courseId } = event.pathParameters;
  const params = {
    TableName: postsTable,
    KeyConditionExpression: "#courseId = :courseId",
    ExpressionAttributeNames: {
      "#courseId": "courseId",
    },
    ExpressionAttributeValues: {
      ":courseId": courseId,
    },
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.item) {
        callback(null, response(200, res.Item));
      } else {
        callback(null, response(404, { error: "CourseID not found" }));
      }
    });
};
