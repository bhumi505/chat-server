module.exports = function(req) {
  const utils = {};

  utils.logger = require('./Logger')(req.requestId);

  return utils;
};
