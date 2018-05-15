const {connection} = require('../db.connection');
var Twilio = require('twilio');

const sendSMS = () => {

  return new Promise((resolve, reject) => {

    const accountSid = 'ACfe1b9bb3073c21d24eb8a0ba34d0708a';          // Twilio Credentials
    const authToken = 'dc4da08b209d54bbb2f0989a4ab90c57';

    const client = new Twilio(accountSid, authToken);                 // require the Twilio module and create a REST client
    const verification_code = Math.floor(1000 + Math.random() * 9000);

    client.messages
      .create({
        to: '+94716220786',
        from: '+13022519234',
        body: 'Your verification code is ' + verification_code
      })
      .then(message => console.log(message.sid));

    mobile = {"verification_code": verification_code};
    resolve(mobile);
  });
};

const addNewUserSeeker = (user) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO user VALUES (?,?,aes_encrypt(?,?))", [
      user.username,
      user.type,
      user.password,
      user.username
    ], (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    })
  });
};

const addNewUserDonor = (user) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO user VALUES (?,?,aes_encrypt(?,?))", [
      user.username,
      user.type,
      user.password,
      user.username
    ], (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    })
  });
};

const searchUser = (user) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM user WHERE username=? and password=aes_encrypt(?,?)", [
      user.username,
      user.password,
      user.username
      ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

module.exports = {
  addNewUserSeeker, addNewUserDonor, searchUser, sendSMS
}
