const express = require('express');
const router = express.Router({});
const mssql = require('../connection');


router.get('/patientCountYearComparison', (req, res) =>{
    res.render("../public/comparison/patientCountYearComparison.ejs");
  });
  
  router.get('/patientCountDatePeriodComparison', (req, res) =>{
    res.render("../public/comparison/patientCountDatePeriodComparison.ejs");
  });
  
  router.get('/patientCountDatePeriodSymptomComparison', (req, res) =>{
    res.render("../public/comparison/patientCountDatePeriodSymptomComparison.ejs");
  });

  router.post('/year/comparison', (req, res) =>{
    const firstYear = req.body.firstYear;
    const secondYear = req.body.secondYear;

    try{
      const firstQuary = "SELECT COUNT(*) count FROM Details WHERE YEAR(ERphysicianDate) = " + firstYear + ";";
      const secondQuary = "SELECT COUNT(*) count FROM Details WHERE YEAR(ERphysicianDate) = " + secondYear + ";";
      const request = new mssql.Request();
      request.query(firstQuary, (err, recordset) =>{
        if (err) console.log(err);

        const firstRecord = recordset.recordset[0].count;
        request.query(secondQuary, (err, recordset) =>{
          if (err) console.log(err);

          const seconRecord = recordset.recordset[0].count;

          res.status(200).json({
            firstYearRecord: firstRecord, 
            secondYearRecord: seconRecord
          });
        });
      });
    } catch (e){
      res.status(404).json(e);
    }
  });

router.post('/date/comparison', (req, res) =>{
  const firstStart = req.body.firstStart;
  const secondStart = req.body.secondStart;

  const firstStartDate = firstStart.slice(0,2);
  const firstStartMonth = firstStart.slice(3,5);
  const firstStartYear = firstStart.slice(6,10);

  const secondStartDate = secondStart.slice(0,2);
  const secondStartMonth = secondStart.slice(3,5);
  const secondStartYear = secondStart.slice(6,10);

  try{
    const firstQuery = "SELECT COUNT(*) count FROM Details WHERE ERphysicianDate ='" + firstStartYear + "-" + firstStartMonth + "-" + firstStartDate + "';";
    const request = new mssql.Request();
    request.query(firstQuery, (err, recordset) =>{
      if (err) console.log(err);

      const firstRecord = recordset.recordset[0].count;
      const secondQuary = "SELECT COUNT(*) count FROM Details WHERE ERphysicianDate ='" + secondStartYear + "-" + secondStartMonth + "-" + secondStartDate + "';";
      request.query(secondQuary, (err, recordset) =>{
        if (err) console.log(err);
        const secondRecord = recordset.recordset[0].count;
        res.status(200).json({
          firstRecord: firstRecord,
          secondRecord: secondRecord
        });
      });
    });
  }catch (e){
    console.log(e);
    res.status(500).json(e);
  }
});

  module.exports = router;