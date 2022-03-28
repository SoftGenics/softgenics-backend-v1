const express =require('express');
const route=express.Router();
const path = require('path');
const db = require('../database/connection');

route.post('/user', function(req,res,next){
     var  name = req.body.name;
     var  number = req.body.number;
     var disc = req.body.disc;
   
      var sql= 'INSERT INTO user VALUES ?';
      const values=[['null',name,number,disc]];
      db.query(sql, [values], (err, results, fields)=>{
          if(err){
          console.log(err) }
          {
              console.log("inserted",results)
              res.end();
          }
      })
}) 


     module.exports = route