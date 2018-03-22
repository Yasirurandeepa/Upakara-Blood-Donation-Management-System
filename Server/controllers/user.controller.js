const {connection} = require('../db.connection');

const addNewUserSeeker = (user) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO user VALUES (?,?,aes_encrypt(?,?))", [
      user.username,
      user.type,
      user.password,
      user.key
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
      user.key
    ], (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    })
  });
};

// const searchUser = (user) => {
//   return new Promise((resolve, reject) => {
//     connection.query("select password FROM user WHERE username=?", [
//       user.username
//     ], (err, result) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(result);
//     })
//   });
// };

const searchUser = (user) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM user WHERE username=? and password=aes_encrypt(?,?)", [
      user.username,
      user.password,
      user.key
      ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

module.exports = {
  addNewUserSeeker, addNewUserDonor, searchUser
}
