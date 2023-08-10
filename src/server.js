import express, { request, response } from "express";
import configViewEngine from "./configs/viewengine";
import initWebRoute from './routes/web';
import initApiRoute from './routes/api';
import Connection from "mysql2/typings/mysql/lib/Connection";
// import connection from './configs/connectDB';

require('dotenv').config();
const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app)
initWebRoute(app)
initApiRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get("/", (request, response) => {
  const query = 'SELEC * FORM product LIMIT 3';
  Connection.query(query, (error, result) => {
    if (!request.session.cart) {
      request.session.cart = [];
    }
    response.render('product', { prducts: result, cart: request.session.cart });
  });
});