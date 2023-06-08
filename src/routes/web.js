import express from "express";
import userController from '../controllers/userController'
import brandController from '../controllers/brandController'
import categoryController from '../controllers/categoryController'
import homeController from '../controllers/homeController'
import productController from '../controllers/productController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', userController.listUsers);

    router.post('/create-user', userController.createUser);
    router.post('/delete-user', userController.deleteUser);
    router.get('/edit-user/:id', userController.editUser);
    router.post('/update-user', userController.updateUser);

    router.get('/add-brand', brandController.addBrand);
    router.get('/brand-list', brandController.getBrandPage);
    router.post('/create-new-brand', brandController.createNewBrand);
    router.post('/delete-brand', brandController.deleteBrand);
    router.get('/edit-brand/:id', brandController.getEditBrandPage);
    router.post('/update-brand', brandController.postUpdateBrand);

    router.get('/add-category', categoryController.addCategory);
    router.get('/category-list', categoryController.getCategoryPage);
    router.post('/create-new-category', categoryController.createNewCategory);
    router.post('/delete-category', categoryController.deleteCategory);
    router.get('/edit-category/:id', categoryController.getEditCategoryPage);
    router.post('/update-category', categoryController.postUpdateCategory);

    router.get('/add-product', productController.addProduct);
    router.get('/product-list', productController.getProductPage);
    router.post('/create-new-product', productController.createNewProduct);
    router.post('/delete-product', productController.deleteProduct);
    router.get('/edit-product/:id', productController.getEditProductPage);
    router.post('/update-product', productController.postUpdateProduct);

    router.get('/home', homeController.getHomePage);
    router.get('/child', homeController.child);

    return app.use('/', router)
}

export default initWebRoute;