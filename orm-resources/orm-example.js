/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chatter', 'root', 'hr48');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
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


var testUser = {
  username: 'abc',
  text: 'booom',
  roomname: 'def'
};

var userId;
var roomId;

User.sync();

Rooms.sync();

Messages.sync()  
  .then(function() {
    return User.findOrCreate({where: {username: testUser.username}});
  })
  .then((user) => {
    return userId = user[0].dataValues.id;
  })
  .then(() => {
    return Rooms.findOrCreate({where: {roomname: testUser.roomname}});
  })
  .then(room => {
    return roomId = room[0].dataValues.id;
  })
  .then(function() {
    return Messages.create({userid: userId, roomid: roomId, text: testUser.text});
  })
  .then(() => { db.close(); });





