const {connection} = require('../db.connection');

const searchDonors = (donor) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM donor WHERE blood_group=? and district=?", [
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

const searchSeekers = (seeker) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM seeker WHERE blood_group=? and district=?", [
      seeker.blood_group,
      seeker.district
    ], (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
};

module.exports = {
  searchDonors, searchSeekers
};
