const express = require('express');
const router = express.Router({});

router.get('/', (req, res) =>{
  res.render("../public/index.ejs");
});

router.get('/patients', (req, res) =>{
  res.render('../public/patients.ejs');
});

module.exports = router;
