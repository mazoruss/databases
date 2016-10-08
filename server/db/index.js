var mysql = require('mysql');


exports.getConnection = function() {

  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hr48',
    database: 'chat'
  });

  connection.connect();

  return connection;
};

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'hr48');

var User = db.define('User', {
  username: {type: Sequelize.STRING, unique: true},
});

var Messages = db.define('Message', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomid: Sequelize.STRING
});

var Rooms = db.define('Room', {
  roomname: {type: Sequelize.STRING, unique: true},
});


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
      return Messages.create({userid: userId, roomid: roomId, text: messageObj.text});
    });
    // .then(() => { db.close(); });
};
