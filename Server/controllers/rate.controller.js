const {connection} = require('../db.connection');

const addRate = (rate) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO rate VALUES (?,?,?)", [
      rate.seeker_username,
      rate.donor_username,
      rate.rate_value
    ], (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    })
  });
};

const getDonorRates = () => {        // query every notification for particular donor from the database
  return new Promise((resolve, reject) => {
    connection.query("select donor_username,sum(rate_value)/count(donor_username) as num from rate group by donor_username", [
    ],(err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

module.exports = {
  addRate, getDonorRates
}
