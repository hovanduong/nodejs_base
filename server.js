require('dotenv').config()
const express=require('express');
const mongoDB=require('./src/database/mongodb/index')
const cors = require('cors');
var sha1 = require('sha1');
var bodyParser=require('body-parser');
const app=express();
app.use(express.json());
app.use(cors());
const server=require('http').createServer(app);

const Role = require('./src/models/role');

var jsonParser=bodyParser.json();
app.use(jsonParser);
app.use('/',require('./src/routes'));
server.listen('8081',()=>{
console.log('Listennig on port 8081');
    mongoDB.connect();
    initial();
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  