const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");

// Check Connection
router.get('/', function(req, res) {
  return res.json({
    response: 0,
    msg: 'CONNECTION LIVE',
  });
});

// Register User Interest
router.post('/', (req, res) => {
  if (req.body.email) {
    const date = new Date();
    const userData = {
      email: req.body.email,
      firstName: req.body.firstName || '',
      secondName: req.body.secondName || '',
      mobileNumber:  req.body.mobileNumber  || '',
      date: date.toUTCString(),
    };

    admin.database().ref().child('/users').push(userData);

    return res.json({
      response: 1,
    });

  } else {
    return res.json({
      response: 0,
      msg: 'FAILED WHEN REGISTERING',
    });
  }
});

module.exports = router;
