var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var DonorController = require('./controllers/donor.controller');
var SeekerController = require('./controllers/seeker.controller');
var UserController = require('./controllers/user.controller');
var NotificationController = require('./controllers/notification.controller');
var ReportController = require('./controllers/report.controller');
var AdminController = require('./controllers/admin.controller');
var RateController = require('./controllers/rate.controller');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server working....");
});

app.listen(3000, () => {
  console.log("Server is up on 3000");
});

//------------------------------donor entity-----------------------------------------------------------------------------

app.post("/add_new_donor", (req, res) => {                                //add new donor
  DonorController.addNewDonor(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/get_ID", (req, res) => {   //  get every user
  DonorController.getNextId().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/get_donor", (req, res) => {                                  //get seeker details by his username
  DonorController.getDonor(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/get_donors", (req, res) => {                                  //get donors by given blood type and district
  SeekerController.getDonors(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.patch("/update_donor_details", (req, res) => {                                           //update donor details
  DonorController.updateDetails(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/remove_donor_profile", (req, res) => {                              //remove selected notification
  DonorController.removeDonorProfile(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});
//------------------------------seeker entity-----------------------------------------------------------------------------

app.post("/get_seeker", (req, res) => {                                  //get seeker details by his username
  SeekerController.getSeeker(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/add_new_seeker", (req, res) => {                              //add new seeker
  SeekerController.addNewSeeker(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/show_accepted_donors", (req, res) => {                              //view accepted donors for particular seekers
  SeekerController.getAcceptedDonors(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.patch("/update_seeker_details", (req, res) => {                                           //update seeker details
  SeekerController.updateDetails(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/remove_seeker_profile", (req, res) => {                              //remove selected notification
  SeekerController.removeSeekerProfile(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});
//------------------------------user entity-----------------------------------------------------------------------------

app.get("/send_sms", (req, res) => {                              //add seeker for user table
  UserController.sendSMS().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/add_new_user_seeker", (req, res) => {                              //add seeker for user table
  UserController.addNewUserSeeker(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/add_new_user_donor", (req, res) => {                              //add donor for user table
  UserController.addNewUserDonor(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(result);
  });
});

app.post("/search_user", (req, res) => {                                  //search for user login.js
  UserController.searchUser(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/request_donor", (req, res) => {                                  //search for user login.js
  UserController.searchUser(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});


//------------------------------notifications-----------------------------------------------------------------------------

app.post("/send_donor_notification", (req, res) => {                                  //search for user login.js
  NotificationController.sendDonorNotification(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
});
});

app.post("/get_donor_notifications", (req, res) => {                                  //  get every notifications
  NotificationController.getDonorNotifications(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.patch("/update_donor_notification", (req, res) => {                                           //update selected notification
  NotificationController.updateDonorNotification(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/remove_donor_notification", (req, res) => {                              //remove selected notification
  NotificationController.removeDonorNotification(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

//------------------------------report entity-----------------------------------------------------------------------------

app.post("/report_donor", (req, res) => {                                //add report
  ReportController.addReport(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/get_reports", (req, res) => {                                  //  get every reports group by donor name
  ReportController.getDonorReports().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

//------------------------------rate entity-----------------------------------------------------------------------------

app.post("/rate_donor", (req, res) => {                                //add rate
  RateController.addRate(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/get_donor_overview", (req, res) => {                                  //  get every reports group by donor name
  RateController.getDonorRates().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

//------------------------------admin entity-----------------------------------------------------------------------------

app.post("/search_seekers", (req, res) => {                                  //search for user login.js
  AdminController.searchSeekers(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/search_donors", (req, res) => {                                  //search for user login.js
  AdminController.searchDonors(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});
