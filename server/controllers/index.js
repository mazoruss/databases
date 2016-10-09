var models = require('../models');
var Promise = require('bluebird');
var db = require('../db');

module.exports = {
  messages: {
    get: function (req, res) {
      var returnObj = {
        results: []
      };
      db.dbGet( data => {
        returnObj.results = data;
        res.json(returnObj);
      });
      // var promisedGet = models.messages.get(req);
      // promisedGet.then(data => {
      //   returnObj.results = data;
      //   res.json(returnObj);
      // });
    }, // a function which handles a get request for all messages
    post: function (req, res) {

      models.messages.post(req.body);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

