const express = require('express');
const router = express.Router({});
const mssql = require('../connection');


router.get('/patientCountYear', (req, res) =>{
    res.render("../public/count/patientCountYear.ejs");
  });
  
  router.get('/patientCountDatePeriod', (req, res) =>{
    res.render("../public/count/patientCountDatePeriod.ejs");
  });
  
  router.get('/patientCountDatePeriodSymptom', (req, res) =>{
    res.render("../public/count/patientCountDatePeriodSymptom.ejs");
  });


router.post('/range/count', async (req, res) => {
    const start = req.body.start;
    const end = req.body.end;
  
    const startDate = start.slice(0,2);
    const startMonth = start.slice(3,5);
    const startYear = start.slice(6,10);
  
    const endDate = end.slice(0,2);
    const endMonth = end.slice(3,5);
    const endYear = end.slice(6,10); 
  
    try{
      const quary = "SELECT COUNT(*) count FROM Details WHERE (ERphysicianDate between '" + startYear + "-" + startMonth + "-" + startDate + "' and '" + endYear + "-" + endMonth + "-" + endDate +"');";
      console.log(quary);
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
  
        res.status(200).json(recordset.recordset[0].count);
      });
    }catch (e){
      res.status(404).json(e);
    }
  
  });


router.post('/date/count/symptoms', (req, res) =>{
    const symptom = req.body.symptoms;
    console.log("symptom= ",symptom);
    const start = req.body.date;
  
    const startDate = start.slice(0,2);
    const startMonth = start.slice(3,5);
    const startYear = start.slice(6,10);
    
    try{
      const quary = "SELECT  COUNT(*) count FROM Details WHERE PresentComplaint LIKE lower('%"+ symptom +"%') AND (ERphysicianDate = '" + startYear + "-" + startMonth + "-" + startDate + "');";
      console.log(quary);
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
        res.status(200).json(recordset.recordset[0].count);
      });
    }catch (e){
      res.status(404).json(e);
    }
  });
  
  router.post('/range/count/symptoms', (req, res) =>{
    const symptom = req.body.symptoms;
    const start = req.body.start;
    const end = req.body.end;
  
    const startDate = start.slice(0,2);
    const startMonth = start.slice(3,5);
    const startYear = start.slice(6,10);
  
    const endDate = end.slice(0,2);
    const endMonth = end.slice(3,5);
    const endYear = end.slice(6,10); 
    
    try{
      const quary = "SELECT  COUNT(*) count FROM Details WHERE PresentComplaint LIKE lower('%"+ symptom +"%') AND (ERphysicianDate BETWEEN '" + startYear + "-" + startMonth + "-" + startDate + "' and '" + endYear + "-" + endMonth + "-" + endDate +"');";
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
        res.status(200).json(recordset.recordset[0].count);
      });
    }catch (e){
      res.status(404).json(e);
    }
  });
  
  router.post('/year/count', async (req, res) =>{
    const year = req.body.year;
    console.log(year);
  
    try{
      const quary = "SELECT COUNT(*) count FROM Details WHERE YEAR(ERphysicianDate) = " + year + ";";
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
  
        res.status(200).json(recordset.recordset[0].count);
      });
    }catch (e){
      res.status(404).json(e);
    }
  });
  
  router.post('/date/count', async function (req, res) {
    const reqDate = req.body.date;
  
    const date = reqDate.slice(0,2);
    const month = reqDate.slice(3,5);
    const year = reqDate.slice(6,10);
  
    try{
      const quary = "SELECT COUNT(*) count FROM Details WHERE ERphysicianDate ='" + year + "-" + month + "-" + date + "';";
      const request = new mssql.Request();
      request.query(quary, function (err, recordsets) {
        if (err) console.log(err);
        
        res.status(200).json(recordsets.recordset[0].count);
      });
    }catch (e){
      res.status(404).json(e);
    }
  });
  
module.exports = router;