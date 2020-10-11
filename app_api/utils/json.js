module.exports.sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

module.exports.sendErrorResponse = (res, error) => {
  res.status(500);
  res.json({
    code: "500",
    message: "Internal Server Error",
    description: error.message,
  });
};
