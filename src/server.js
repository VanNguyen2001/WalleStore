import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoute from './routes/web';
// import connection from './configs/connectDB';

require('dotenv').config();
const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app)
initWebRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})