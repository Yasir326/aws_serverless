"use strict";
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const {response} = require("./helper_functions");

const postsTable = process.env.POSTS_TABLE;

module.exports.getCourseStats = (event, context, callback) => {
  const { courseId } = event.pathParameters;
  const params = {
    TableName: postsTable,
    Key: {
      id: courseId,
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
