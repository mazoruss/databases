
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'hr48');

var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
});

var Messages = db.define('Message', {
  // userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  // roomid: Sequelize.STRING
});

var Rooms = db.define('Room', {
  roomname: {type: Sequelize.STRING, unique: true},
});

User.hasMany(Messages);
Rooms.hasMany(Messages);
Messages.belongsTo(User);
Messages.belongsTo(Rooms);


exports.dbPost = function(messageObj) {
  var userId;
  var roomId;

  User.sync();

  Rooms.sync();

  Messages.sync()  
    .then(function() {
      return User.findOrCreate({where: {username: messageObj.username}});
    })
    .then((user) => {
      return userId = user[0].dataValues.id;
    })
    .then(() => {
      return Rooms.findOrCreate({where: {roomname: messageObj.roomname}});
    })
    .then(room => {
      return roomId = room[0].dataValues.id;
    })
    .then(function() {
      return Messages.create({UserId: userId, RoomId: roomId, text: messageObj.text});
    });
    // .then(() => { db.close(); });
};

exports.dbGet = function(callback) {
  
  db.query('SELECT * FROM messages, users, rooms WHERE messages.UserId = users.id and messages.RoomId = rooms.id;')
    .spread(function(rows, metadata) {
      callback(rows);
    });
};

// // deprecated due to use of ORM
// var mysql = require('mysql');


// exports.getConnection = function() {

//   var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'hr48',
//     database: 'chat'
//   });

//   connection.connect();

//   return connection;
// };






















































