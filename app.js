const express = require('express');
const fs = require('fs');
const http = require('http');
const bodyParser = require('body-parser');
const User = require('./models/users');
const path = require('path');
const Forgotpassword = require('./models/forgotpassword');
const helmet = require('helmet');

var cors = require('cors');
const dotenv = require('dotenv');   // to access environment variables

const app = express();

dotenv.config();

app.use(cors());          //required to build web applications that access APIs hosted on a different domain or origin.

app.use(express.json());

const sequelize = require('./util/database');

const userRoutes = require('./routes/user');

const resetPasswordRoutes = require('./routes/resetpassword');

app.use(helmet());       //secure your Node. js application by setting several HTTP headers like https


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoutes);
app.use('/password', resetPasswordRoutes);


User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);



sequelize.sync(
  //{force : true}
  )
  .then(result => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });











  //app.use(morgan('combined'),{ stream : accessLogStream});