const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/Logger');

module.exports = function (req, res, next) {
  req.requestId = uuidv4();
  req.requestTime = moment();
  req.logger = logger(req.requestId);

  res.data = {};
  res.setDataAsArray = function() {
    res.data = [];
  };
  res.answerWith = function(rc, rd) {
    const endTime = moment();
    const duration = moment.duration(endTime.diff(req.requestTime));
    const timeFormat = "YYYY-MM-DDTHH:mm:ss.SSSZ";

    res.status(rc);

    res.json({
      rc: rc.toString(),
      rd: rd,
      data: res.data,
      meta: {
        startAt: req.requestTime.format(timeFormat),
        finishedAt: endTime.format(timeFormat),
        duration: duration.asMilliseconds() + "ms",
        requestId: req.requestId,
      }
    })
  };

  next();
};
