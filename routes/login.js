const express = require('express');
const router = express.Router({});
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const mssql = require('../connection');

router.post('/', async (req, res) => {
  const DRNO = req.body.DRNO;
  const EnteredPassword = req.body.password;
  try {
    // const query = "SELECT Authentication.DRPassword, DRName FROM Authentication, Doctors WHERE Doctors.DRNO = Authentication.DRNO AND Authentication.DRNO = '" + DRNO + "';";
    const query = "SELECT * FROM Authentication WHERE DRNO = '" + DRNO + "';";
    // const query = "SELECT DRPassword, DRName from Doctors WHERE DRNO = '" + DRNO + "';";

    const request = new mssql.Request();
    request.query(query, (err, record) => {
      if (err) console.log(err);
      bcrypt.compare(EnteredPassword, record.recordset[0].DRPassword, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(401).json({
              message: 'Auth failed'
            });
          }
          console.log(result);
          if (result) {
            const token = jwt.sign(
              {
                DRNO: this.DRNO
              },
              "secret",
              {
                  expiresIn: "24h"
              }
            );
            return res.status(200).json({
              "success": "Auth Successful",
              token: token
            });
          }
          res.status(401).json({
            message: 'Auth failed'
          });
        }
      );
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

router.get('/', function(req, res) {
  res.render('../public/login.ejs');
});

module.exports = router;
