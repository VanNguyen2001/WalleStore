import express from "express";
import APIController from '../controller/APIController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/user', APIController.getAllUsers); //method GET -> READ data
    router.post('/create-user', APIController.createNewUser); //method POST -> CREATE data

    return app.use('/api/v1/', router)
}

export default initAPIRoute;