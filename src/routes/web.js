import express from "express";
import homeController from '../controllers/homeController'
import brandController from '../controllers/brandController'
import categoryController from '../controllers/categoryController'
import userController from '../controllers/userController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', userController.getUserPage);

    router.get('/home', homeController.getHomePage);

    router.get('/detail/user/:id', userController.getDetailUserPage);
    router.post('/create-new-user', userController.createNewUser);
    router.post('/delete-user', userController.deleteUser);
    router.get('/edit-user/:id', userController.getEditPage);
    router.post('/update-user', userController.postUpdateUser);
    router.get('/user__list', userController.getUserPage);

    router.get('/brand__list', brandController.getBrandPage);
    router.get('/detail-brand/brand/:id', brandController.getDetailBrandPage);
    router.post('/create-new-brand', brandController.createNewBrand);
    router.post('/delete-brand', brandController.deleteBrand);
    router.get('/edit-brand/:id', brandController.getEditBrandPage);
    router.post('/update-brand', brandController.postUpdateBrand);

    router.get('/category__list', categoryController.getCategoryPage);
    router.get('/detail-category/category/:id', categoryController.getDetailCategoryPage);
    router.post('/create-new-category', categoryController.createNewCategory);
    router.post('/delete-category', categoryController.deleteCategory);
    router.get('/edit-category/:id', categoryController.getEditCategoryPage);
    router.post('/update-category', categoryController.postUpdateCategory);



    router.get('/about', (req, res) => {
        res.send('My!')
    })

    return app.use('/', router)
}

export default initWebRoute;