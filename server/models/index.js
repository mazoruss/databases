var db = require('../db');
var Promise = require('bluebird');

// var queryString = {
//   getUserId: function(username) {
//     return 'select id from user where username="' + username + '";';
//   },

//   insertUser: function(username) {
//     return 'insert ignore into user(username) values ("' + username + '");';
//   },

//   getRoomId: function(roomname) {
//     return 'select id from room where roomname="' + roomname + '";';
//   },

//   insertRoom: function(roomname) {
//     return 'insert ignore into room(roomname) values ("' + roomname + '")';
//   },
// };



// var queryUserPromise = function(connection, username, method) {
//   var promise = new Promise(function(resolve, reject) {
//     connection.query(queryString[method](username), function(err, rows, fields) { 
//       err ? reject(err) : resolve(rows[0]);
//     });
//   });
//   return promise;
// };

// var queryRoomPromise = function(connection, roomname, method) {
//   var promise = new Promise(function(resolve, reject) {
//     connection.query(queryString[method](roomname), function(err, rows, fields) { 
//       err ? reject(err) : resolve(rows[0]);
//     });
//   });
//   return promise;
// };


module.exports = {
  messages: {
    get: function () {
      var promise = new Promise(function(resolve, reject) {
        var connection = db.getConnection();
        connection.query('select * from messages, users, rooms where messages.userid=users.id and messages.roomid = rooms.id;', (err, rows, fields) => {
          resolve(rows);
        });
      });
      return promise;
    },
    post: function (data) {
      
      db.dbPost(data);

      // //native mysql work below:
      // var connection = db.getConnection();
      // var username = data.username;
      // var text = data.text;
      // var roomname = data.roomname;
      // var userId;
      // var roomId;

      // queryUserPromise(connection, username, 'insertUser')
      //   .then(() => {
      //     return queryRoomPromise(connection, roomname, 'insertRoom');
      //   })
      //   .then(() => {
      //     return queryUserPromise(connection, username, 'getUserId');
      //   })
      //   .then(obj => {
      //     userId = obj.id;
      //     return queryRoomPromise(connection, roomname, 'getRoomId');
      //   })
      //   .then(obj => {
      //     roomId = obj.id;
      //     connection.query(`insert into messages(text, user_id, room_id) values ("${text}", "${userId}", "${roomId}");`, err => err ? console.log(err) : null);
      //     connection.end();
      //   });
    } 
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};
