
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
//const bodyparser=require('body-parser');
const path = require('path');
 const cors = require("cors");
const  upload=require('express-fileupload');
var fs = require('fs');
const db = require('./server/database/connection');
const multer=require('multer');


app.use(upload());
const body=require("body-parser");
const  urlEncoder= body.urlencoded({extended:true});
const jsonEncoder=body.json();

app.use(urlEncoder);
app.use(jsonEncoder);



const con=require('./server/database/connection')
 app.use(cors({origin:"*"}));
dotenv.config({path:'config.env'}
)
const PORT=process.env.PORT||8080

//log request
app.use(morgan("tiny"));    

app.use(express.static(__dirname + '/image'));

//app.use('/static',express.static("./image"))
const storage = multer.diskStorage({
	
    destination:(req,file,cd) =>{
   cd(null, 'image');
    },

   filename:(req, file, cd) =>{


       cd(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
         
        },	
   

});
const uploads= multer({storage: storage}).single('image');
// body parser
// app.use(bodyparser.urlencoded({extended:true}))

app.post('/users',function(req,res,next){
    uploads(req,res);
    
    var image=req.body.image;
     var  name = req.body.name;
     var  number = req.body.number;
     var disc = req.body.disc;
     
      // status=req.body.status
      var sql= 'INSERT INTO user VALUES (NULL,?,?,?,?)';
      const values=[[name,number,disc,image]];
      console.log(values);
      db.query(sql,[values], (err, results,fields)=>{
          if(err){
          console.log(err) }
          {
              console.log("inserted",results.insertId )
              res.end();
          }
      })
}) 
















// set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))
//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//app.use('/',require('./server/routes/image'))
app.use('/',require('./server/routes/router'))
//app.use('/',require('./server/uploadphoto/image'))

app.listen(5000, () =>{console.log(`server is running on http://localhost:${PORT}`)});