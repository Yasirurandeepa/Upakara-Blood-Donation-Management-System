var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var DonorController = require('./controllers/donor.controller');
var SeekerController = require('./controllers/seeker.controller');
var UserController = require('./controllers/user.controller');
var NotificationController = require('./controllers/notification.controller');


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

app.patch("/update_seeker_details", (req, res) => {                                           //update selected notification
  SeekerController.updateDetails(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});
//------------------------------user entity-----------------------------------------------------------------------------

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
    res.status(400).send(err);
  });
});

app.post("/search_user", (req, res) => {                                  //search for user login
  UserController.searchUser(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/request_donor", (req, res) => {                                  //search for user login
  UserController.searchUser(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});


//------------------------------notifications-----------------------------------------------------------------------------

app.post("/send_donor_notification", (req, res) => {                                  //search for user login
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
