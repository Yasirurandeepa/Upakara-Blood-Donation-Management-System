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

const updateDetails = (donor) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE donor SET email=?, contact_no=?, gender=?, NIC=?, blood_group=?  WHERE username=?", [
      donor.email,
      donor.contact_no,
      donor.gender,
      donor.nic,
      donor.blood_group,
      donor.username
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

const removeDonorProfile = (donor) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM user WHERE username=?", [
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
  addNewDonor, searchUser, getDonor, updateDetails, removeDonorProfile
};
