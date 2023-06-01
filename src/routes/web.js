import express from "express";
import homeController from '../controllers/homeController'
import brandController from '../controllers/brandController'
import categoryController from '../controllers/categoryController'

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getAdminPage);

    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser);

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

    router.get('/home', homeController.getHomePage);
    

    router.get('/about', (req, res) => {
        res.send('My!')
    })
    
    return app.use('/', router)
}

export default initWebRoute;