"use strict";
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const {response, sortByDate } = require("./helper_functions");

const postsTable = process.env.POSTS_TABLE;

module.exports.getCourseStats = (event, context, callback) => {
 const courseId = event.pathParameters.courseId;
 const params = {
   TableName: postsTable,
   Limit: courseId,
 };
  return db
    .scan({
      params,
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items.sort(sortByDate)));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
