const {connection} = require('../db.connection');

const addNewDonor = (user) => {
  return new Promise((resolve, reject) => {
      connection.query("INSERT INTO donor VALUE(?,?,?,?,?,?,?,?)", [
        user.username,
        user.email,
        user.gender,
        user.nic,
        user.blood_group,
        user.contact_no,
        user.address,
        user.district
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
    connection.query("select password FROM donor WHERE username=?", [
      user.username
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

const getDonor = (donor) => {
  return new Promise((resolve, reject) => {
    connection.query("select * FROM donor WHERE username=?", [
      donor.username
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

module.exports = {
  addNewDonor, searchUser, getDonor
};
