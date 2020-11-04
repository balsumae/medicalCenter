const express = require('express');
const router = express.Router({});
const mssql = require('../connection');


router.get('/patientDetailsDatePeriod', (req, res) =>{
    res.render("../public/details/patientDetailsDatePeriod.ejs");
  });
  
  router.get('/patientDetailsYear', (req, res) =>{
    res.render("../public/details/patientsDetailsYear.ejs");
  });
  
  router.get('/patientDetailsDatePeriodSymptom', (req, res) =>{
    res.render("../public/details/patientDetailsDatePeriodSymptom.ejs");
  });
  
  router.post('/date/details', async (req, res) =>{
    const reqDate = req.body.date;
  
    const date = reqDate.slice(0,2);
    const month = reqDate.slice(3,5);
    const year = reqDate.slice(6,10);
  
    try{
      const quary = "SELECT * FROM Details WHERE ERphysicianDate ='" + year + "-" + month + "-" + date + "' ORDER BY ERphysicianDate;";
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
  
        res.status(200).json(recordset.recordset);
      });
    }catch (e){
      res.status(404).json(e);
    }
  });
  
  router.post('/range/details', async (req,res) =>{
    const start = req.body.start;
    const end = req.body.end;
  
    const startDate = start.slice(0,2);
    const startMonth = start.slice(3,5);
    const startYear = start.slice(6,10);
  
    const endDate = end.slice(0,2);
    const endMonth = end.slice(3,5);
    const endYear = end.slice(6,10); 
  
    try{
      const quary = "SELECT * FROM Details WHERE (ERphysicianDate between '" + startYear + "-" + startMonth + "-" + startDate + "' and '" + endYear + "-" + endMonth + "-" + endDate +"') ORDER BY ERphysicianDate;"
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
        res.status(200).json(recordset.recordset)
      });
    }catch (e){
      res.status(404).json(e);
    }
  });
  
  router.post('/year/details', async (req, res) =>{
    const year = req.body.year;
  
    try{
      const quary = "SELECT * FROM Details WHERE YEAR(ERphysicianDate) = " + year + " ORDER BY ERphysicianDate;";
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
  
        res.status(200).json(recordset.recordset);
      });
    }catch (e){
      res.status(404).json(e);
    }
  });
  
  router.post('/date/details/symptoms', (req, res) =>{
    const symptom = req.body.symptoms;
    const start = req.body.date;
  
    const startDate = start.slice(0,2);
    const startMonth = start.slice(3,5);
    const startYear = start.slice(6,10);
    
    try{
      const quary = "SELECT * FROM Details WHERE PresentComplaint LIKE lower('%"+ symptom +"%') AND (ERphysicianDate = '" + startYear + "-" + startMonth + "-" + startDate + "');";
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
        res.status(200).json(recordset.recordset);
      });
    }catch (e){
      res.status(404).json(e);
    }
  });
  
  router.post('/range/details/symptoms', (req, res) =>{
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
      const quary = "SELECT * FROM Details WHERE PresentComplaint LIKE lower('%"+ symptom +"%') AND (ERphysicianDate BETWEEN '" + startYear + "-" + startMonth + "-" + startDate + "' and '" + endYear + "-" + endMonth + "-" + endDate +"');";
      const request = new mssql.Request();
      request.query(quary, (err, recordset) =>{
        if (err) console.log(err);
        res.status(200).json(recordset.recordset);
      });
    }catch (e){
      res.status(404).json(e);
    }
  });

  module.exports = router;