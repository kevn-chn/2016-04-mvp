var Message = require('./messageModel.js');
var util = require('../config/util.js');

module.exports = {

  recentMessages: function (req, res, next) {
    Message.find().sort('-createdAt').limit(50)
    .then(function (messages) {
      res.json(messages);
    })
    .catch(function (error) {
      next(error);
    });
  },

  addMessage: function (req, res, next) {
    var text = util.escapeHtml(req.body.text);

    Message.create({text: text})
    .then(function (createdMessage) {
      if (createdMessage) {
        res.json(createdMessage);
      }
    })
    .catch(function (error) {
      next(error);
    });
  },

};
