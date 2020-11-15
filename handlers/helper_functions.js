export const response = (statusCode, message) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
};

export const sortByDate = (a, b) => {
  if (a.createdAt > b.createdAt) {
    return -1;
  } else {
    return 1;
  }
};
