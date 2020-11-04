const express = require('express');
const router = express.Router({});
const bcrypt = require('bcrypt');
const mssql = require('../connection');

router.get('/', (req, res) => {
  res.render('../public/register.ejs');
});

router.post('/', async (req, res) => {
  const DRNO = req.body.DRNO;
  try {
    const request = new mssql.Request();
    const query = "SELECT * FROM Authentication WHERE DRNO = '" + DRNO + "';";
    const result = await request.query(query); 

    if(result.rowsAffected == 1){
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const query = "UPDATE Authentication SET DRPassword = '" + hashedPassword + "'WHERE DRNO = '" + DRNO + "';"; 
      request.query(query, function(err) {
        if (err) console.log(err);
      });
      res.status(200).json({"success": "User created successfully"});
    } else {
      res.status(409).json({"fail": "Wrong Id"});
    }
  } catch {
    res.status(500).json({"fail": "Something went wrong"});
  }
});

module.exports = router;
