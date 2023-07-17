import express from "express";
import userController from '../controllers/userController'

let router = express.Router();

const initApiRoute = (app) => {

    // router.get('/list-users', userController.listUsers);
    router.post('/create-user', userController.createUser);
    router.put('/update-user', userController.updateUser);
    router.delete('/delete-user/:id', userController.deleteUser);

    return app.use('/api/w/', router)
}

export default initApiRoute;