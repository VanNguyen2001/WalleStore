import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from './routes/web';
import initApiRoute from './routes/api';
// import connection from './configs/connectDB';

require('dotenv').config();
const app = express();
const port = process.env.PORT;
const flash = require('express-flash');
const session = require('express-session');

// const checkRole = (role) => {
//   return (req, res, next) => {
//     if (req.user && req.user.role === role) {
//       next();
//     } else {
//       res.status(403).send('Unauthorized');
//     }
//   }
// };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

// app.get('/', checkRole('admin'), (req, res) => {
//   // code xử lý cho route "admin"
// });
// app.get('/home', checkRole('user'), (req, res) => {

// });

configViewEngine(app)
initWebRoute(app)
initApiRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})