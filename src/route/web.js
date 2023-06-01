import express from "express";
import homeController from '../controller/homeController'
import brandController from '../controller/brandController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser);

    router.get('/detail-brand/brand/:id', brandController.getDetailBrandPage);
    router.post('/create-new-brand', brandController.createNewBrand);
    router.post('/delete-brand', brandController.deleteBrand);
    router.get('/edit-brand/:id', brandController.getEditBrandPage);
    router.post('/update-brand', brandController.postUpdateBrand);




    router.get('/about', (req, res) => {
        res.send('My!')
    })

    return app.use('/', router)
}

export default initWebRoute;