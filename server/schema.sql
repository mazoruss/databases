CREATE DATABASE chat;

USE chat;

CREATE TABLE user (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(16) NOT NULL UNIQUE
);

CREATE TABLE messages (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  text VARCHAR(140),
  createdAt TIMESTAMP,
  user_id INTEGER NOT NULL,
  roomname VARCHAR(30),
  FOREIGN KEY(user_id) REFERENCES user(id)
);