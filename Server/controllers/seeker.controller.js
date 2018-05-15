const {connection} = require('../db.connection');

const addNewSeeker = (user) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO seeker VALUE(?,?,?,?,?,?,?)", [
      user.username,
      user.email,
      user.contact_no,
      user.gender,
      user.nic,
      user.blood_group,
      user.district
    ], (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    })
  });
};

const getSeeker = (seeker) => {
  return new Promise((resolve, reject) => {
    connection.query("select * FROM seeker WHERE username=?", [
      seeker.username
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

const getDonors = (donor) => {
  return new Promise((resolve, reject) => {
    connection.query("select username FROM donor WHERE blood_group=? and district=?", [
      donor.blood_group,
      donor.district
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

const getAcceptedDonors = (seeker) => {
  return new Promise((resolve, reject) => {
    connection.query("select * FROM notification left outer join donor on notification.donor_username=donor.username left outer join rate on notification.seeker_username=rate.seeker_username and notification.donor_username=rate.donor_username WHERE notification.seeker_username=? and status=?", [
      seeker.seeker_username,
      'Accepted'
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

const updateDetails = (seeker) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE seeker SET email=?, contact_no=?, gender=?, NIC=?, blood_group=?  WHERE username=?", [
      seeker.email,
      seeker.contact_no,
      seeker.gender,
      seeker.nic,
      seeker.blood_group,
      seeker.username
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

const removeSeekerProfile = (seeker) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM user WHERE username=?", [
      seeker.username
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

module.exports = {
  addNewSeeker, getSeeker, getDonors, getAcceptedDonors, updateDetails, removeSeekerProfile
};
