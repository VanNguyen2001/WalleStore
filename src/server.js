import express from "express";
import configViewEngine from "./configs/viewengine";
import initWebRoute from './routes/web';
import initApiRoute from './routes/api';
// import connection from './configs/connectDB';

require('dotenv').config();
const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

configViewEngine(app)
initWebRoute(app)
initApiRoute(app)

app.listen(port, () => {
  console.log(`Trang web đang được chạy ở cổng ${port}`)
})