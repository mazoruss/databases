var db = require('../db');
var Promise = require('bluebird');

var queryString = {
  getUserId: function(username) {
    return 'insert ignore into user(username) values ("' + username + '"); select id from user where username="' + username + '";';
  },

  getRoomId: function(roomname) {
    return 'insert ignore into room(name) values ("' + roomname + '"); select id from room where name="' + roomname + '";';
  },
};



var queryUserPromise = function(connection, username) {
  var promise = new Promise(function(resolve, reject) {
    connection.query(queryString.getUserId(username), function(err, rows, fields) { 
      err ? reject(err) : resolve(rows[0]);
    });
  });
  return promise;
};

var queryRoomPromise = function(connection, roomname) {
  var promise = new Promise(function(resolve, reject) {
    connection.query(queryString.getRoomId(roomname), function(err, rows, fields) { 
      err ? reject(err) : resolve(rows[0]);
    });
  });
  return promise;
};


module.exports = {
  messages: {
    get: function () {
      var promise = new Promise(function(resolve, reject) {
        var connection = db.getConnection();
        connection.query('select * from messages, user where messages.user_id=user.id;', (err, rows, fields) => {
          resolve(rows);
        });
      });
      return promise;
    },
    post: function (data) {
      
      var connection = db.getConnection();
      var username = data.username;
      var content = data.text;
      var roomname = data.roomname;
      var userId;

      queryUserPromise(connection, username).then(obj => {
        userId = obj.id;
        connection.query(`insert into messages(text, user_id, roomname) values ("${content}", "${userId}", "${roomname}");`, err => console.log(err));
      });



      // queryUserPromise(connection, username, 'getUserId').then(obj => {
      //   if (obj === undefined) {
      //     queryUserPromise(connection, username, 'insertUser').then(obj => {
      //       queryUserPromise(connection, username, 'getUserId').then(obj => {
      //         userId = obj.id;
      //         console.log('inserted user, and get id: ', userId);
      //         connection.query(`insert into messages(text, user_id, roomname) values ("${content}", "${userId}", "${roomname}");`, err => console.log(err));
      //         // connection.end();
      //       });
      //     });
      //   } else {
      //     userId = obj.id;
      //     console.log('no insert user, id: ', userId);
      //     connection.query(`insert into messages(text, user_id, roomname) values ("${content}", "${userId}", "${roomname}");`, err => console.log(err));
      //     // connection.end();
      //   }
      // });

      // queryRoomPromise(connection, roomname, 'getRoomId').then(obj => {
      //   if (obj === undefined) {
      //     queryRoomPromise(connection, roomname, 'insertRoom').then(obj => {
      //       queryRoomPromise(connection, roomname, 'getRoomId').then(obj => {
      //         roomId = obj.id;
      //         console.log('inserted room, and get id: ', roomId);
      //       });
      //     });
      //   } else {
      //     roomId = obj.id;
      //     console.log('no insert room, id: ', roomId);
      //   }
      // });


    } 
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};
