CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INTEGER NOT NULL PRIMARY KEY,
  content VARCHAR(140),
  createdAt TIMESTAMP,
  user_id INTEGER,
  room_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES user(id), 
  FOREIGN KEY(room_id) REFERENCES room(id)
);

CREATE TABLE user (
	id INTEGER NOT NULL PRIMARY KEY,
	name VARCHAR(16) NOT NULL UNIQUE
);

CREATE TABLE room (
	id INTEGER NOT NULL PRIMARY KEY,
	name VARCHAR(30) NOT NULL UNIQUE
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

