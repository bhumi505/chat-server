const moment = require('moment');
const createError = require('http-errors');

module.exports = function(requestId) {
  const timeFormat = "YYYY-MM-DDTHH:mm:ss.SSSZ";
  const messageFormat = "[%s] [%s] [INSTANCE_ID-%d] [%s] %s";

  return {
    log: function(message) {
      console.log(messageFormat, moment().format(timeFormat), "LOG", process.env.pm_id, requestId, message);
    },
    info: function(message) {
      console.info(messageFormat, moment().format(timeFormat), "INFO", process.env.pm_id, requestId, message);
    },
    warning: function(message) {
      console.warn(messageFormat, moment().format(timeFormat), "WARNING", process.env.pm_id, requestId, message);
    },
    trace: function(message) {
      console.trace(messageFormat, moment().format(timeFormat), "TRACE", process.env.pm_id, requestId, message);
    },
    debug: function(message) {
      console.debug(messageFormat, moment().format(timeFormat), "DEBUG", process.env.pm_id, requestId, message);
    },
    error: function(status, message, exception) {
      if(exception) {
        console.error(exception);
      }

      console.error(messageFormat, moment().format(timeFormat), "ERROR", process.env.pm_id, requestId, createError(status, message).stack.replace(/\n/g, "    =>"));
    },
    fatal: function(status, message, exception) {
      if(exception) {
        console.error(exception);
      }

      console.error(messageFormat, moment().format(timeFormat), "FATAL", process.env.pm_id, requestId, createError(status, message).stack.replace(/\n/g, "    =>"));
    }
  };
};
