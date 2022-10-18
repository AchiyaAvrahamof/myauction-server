const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv')
const cors = require('cors');
const express=require('express')
const  mongoose  = require('mongoose')
const app=express()
const port=5000
const routes =require('../server/routes/index')
const bodyParser=require('body-parser')
require('dotenv').config()
app.use(cors())

mongoose.Promise=global.Promise
mongoose.connect(process.env.DB,{useNewUrlParser:true})
     .then(()=>{console.log('conected to Data base') })
     .catch((err)=>console.log(err))
     app.use(bodyParser.json())
     app.use('/api',routes)
     
     app.use((err,req,res,next)=>{
    console.log(err);
 
    next();
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.listen(port,()=>{
    console.log('server conected on port: '+port);
})

