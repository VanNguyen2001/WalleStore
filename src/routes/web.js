import express from "express";
import homeController from '../controllers/homeController'
import brandController from '../controllers/brandController'
import categoryController from '../controllers/categoryController'
import productController from '../controllers/productController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getAdminPage);

    router.get('/login', homeController.getLoginPage);

    router.get('/detail/users/:id', homeController.getUsersPage);
    router.post('/create-new-users', homeController.createNewusers);
    router.post('/delete-users', homeController.deleteusers);
    router.get('/edit-users/:id', homeController.getEditPage);
    router.post('/update-users', homeController.postUpdateusers);

    router.get('/brand-list', brandController.getBrandPage);
    router.get('/detail-brand/brand/:id', brandController.getDetailBrandPage);
    router.post('/create-new-brand', brandController.createNewBrand);
    router.post('/delete-brand', brandController.deleteBrand);
    router.get('/edit-brand/:id', brandController.getEditBrandPage);
    router.post('/update-brand', brandController.postUpdateBrand);

    router.get('/category-list', categoryController.getCategoryPage);
    router.get('/detail-category/category/:id', categoryController.getDetailCategoryPage);
    router.post('/create-new-category', categoryController.createNewCategory);
    router.post('/delete-category', categoryController.deleteCategory);
    router.get('/edit-category/:id', categoryController.getEditCategoryPage);
    router.post('/update-category', categoryController.postUpdateCategory);

    router.get('/product-list', productController.getProductPage);
    router.get('/detail-product/product/:id', productController.getDetailProductPage);
    router.post('/create-new-product', productController.createNewProduct);
    router.post('/delete-product', productController.deleteProduct);
    router.get('/edit-product/:id', productController.getEditProductPage);
    router.post('/update-product', productController.postUpdateProduct);

    router.get('/home', homeController.getHomePage);

    // router.get('/api/get-all-users', userController.handleGetAllUsers);

    router.get('/about', (req, res) => {
        res.send('My!')
    })

    return app.use('/', router)
}

export default initWebRoute;