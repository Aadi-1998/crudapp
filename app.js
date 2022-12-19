const express = require("express");
const path = require ('path')
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
require("./DB/conn");
const users=  require("./models/userSchema")
const cors= require('cors')
const router = require('./routes/router')

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(router);

//static path
app.use(express.static(path.join(__dirname, '../crudapp/build')))
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname,'../crudapp/public/index.html'))
})


app.listen(port, () => {
  console.log(`Server is start port number : ${port}`);
});

