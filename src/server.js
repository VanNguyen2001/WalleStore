import express from "express";
import configViewEngine from "./configs/viewengine";
import initWebRoute from './routes/web';
import initApiRoute from './routes/api';
// import connection from './configs/connectDB';

require('dotenv').config();
const app = express()
const port = process.env.PORT;
const flash = require('express-flash');
const session = require('express-session');

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

configViewEngine(app)
initWebRoute(app)
initApiRoute(app)

app.listen(port, () => {
  console.log(`Trang web đang được chạy ở cổng ${port}`)
})