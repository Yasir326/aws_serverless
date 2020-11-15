"use strict";
const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const { v4: uuidv4} = require("uuid");
const { response } = require("./helper_functions")

const postsTable = process.env.POSTS_TABLE;

const response = (statusCode, message) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
};

module.exports.postCourseStats = (event, context, callback) => {
  const reqBody =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  const totalModulesStudied = reqBody.totalModulesStudied;
  const averageScore = reqBody.averageScore;
  const timeStudied = reqBody.timeStudied;

    if (
      typeof totalModulesStudied !== "number" ||
      typeof averageScore !== "number" ||
      typeof timeStudied !== "number"
    ) {
      console.error("Invalid Data Passed");
      callback(new Error("Could not post due invalid data being passed"));
      return;
    }

  const post = {
    sessionId: uuidv4(),
    createdAt: new Date().toISOString(),
    totalModulesStudied,
    averageScore,
    timeStudied,
  };

  return db
    .put({
      TableName: postsTable,
      Item: post
    })
    .promise()
    .then(() => {
      callback(null, response(201, post), );
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};
