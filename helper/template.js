const ResponseTemplate = (data, message, error, success) => {
  return {
    data,
    message,
    error,
    success,
  };
};

module.exports = ResponseTemplate;
