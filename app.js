const express = require('express');
require('dotenv').config()
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser  = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/tutorials');
const videoRouter = require('./routes/video');
const auth = require('./routes/auth');
const MongoStore = require('connect-mongo')(session);
const app = express();
mongoose.connect(process.env.MONGO_URL,{useUnifiedTopology:true},(res)=>{
  console.log('db connected!');
})
const maxAge = 2*60*60*60*1000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(session({
  resave:false,
  name:'login_session',
  secret:process.env.SESSION_SECRET,
  saveUninitialized:false,
  store:new MongoStore({mongooseConnection:mongoose.connection}),
  cookie:{
    maxAge,
    httpOnly:false,
    secure:false
  }
}));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/tutorials', usersRouter);
app.use('/auth',auth);
app.use('/video',videoRouter);
app.use('/', indexRouter);
app.get('*',(req,res)=>{
  res.redirect('/tutorials')
})
module.exports = app;
