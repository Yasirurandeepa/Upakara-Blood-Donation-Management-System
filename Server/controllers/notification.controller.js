const {connection} = require('../db.connection');

const sendDonorNotification = (msg) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO notification VALUES (?,?,'Pending')", [
      msg.donor_username,
      msg.seeker_username
    ], (err, res) => {
      resolve(res);
    })
  });
};

const getDonorNotifications = (donor) => {        // query every notification for particular donor from the database
  return new Promise((resolve, reject) => {
    connection.query("select * from notification left outer join seeker on notification.seeker_username=seeker.username where donor_username=? and status=?", [
      donor.donor_username,
      'Pending'
    ],(err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};

const updateDonorNotification = (msg) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE notification SET status='Accepted' WHERE donor_username=? and seeker_username=?", [
      msg.donor_username,
      msg.seeker_username
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

const removeDonorNotification = (msg) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM notification WHERE donor_username=? and seeker_username=?", [
      msg.donor_username,
      msg.seeker_username
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};


module.exports = {
  sendDonorNotification, getDonorNotifications, removeDonorNotification, updateDonorNotification
}
