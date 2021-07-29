require('dotenv').config()
const express=require('express');
const mongoDB=require('./src/database/mongodb/index');
// const shared=require('./src/shared');
const cors = require('cors');
var sha1 = require('sha1');

var bodyParser=require('body-parser');
const app=express();
app.use(express.json());
app.use(cors());
const server=require('http').createServer(app);

var jsonParser=bodyParser.json();
app.use(jsonParser);
app.use('/',require('./src/routes'));
server.listen('8081',()=>{
console.log('Listennig on port 8081');
    mongoDB.connect();
    // console.log(sha1("message"));

});