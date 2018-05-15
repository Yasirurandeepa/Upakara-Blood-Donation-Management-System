const {connection} = require('../db.connection');

const addReport = (report) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO report VALUES (?,?)", [
      report.seeker_username,
      report.donor_username
    ], (err, res) => {
      resolve(res);
    })
  });
};

const getDonorReports = () => {        // query every notification for particular donor from the database
  return new Promise((resolve, reject) => {
    connection.query("select donor_username, count(donor_username) as num from report group by donor_username", [
    ],(err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
};

module.exports = {
  addReport, getDonorReports
}
