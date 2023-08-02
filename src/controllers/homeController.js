import pool from '../configs/connectDB';

let homePage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM categorys');
    const [roll] = await pool.execute('SELECT * FROM brands');
    const [product] = await pool.execute('SELECT * FROM products');

<<<<<<< HEAD
    return res.render('pages/index.ejs', { dataCategory: rows, dataBrand: roll })
=======
    return res.render('pages/index.ejs', { dataCategory: rows, dataBrand: roll, dataProduct: product})
>>>>>>> 8d1124fd0dc7adacf926b300f75ad6113d767f3a
}

let loginPage = async (req, res) => {
    return res.render('pages/login.ejs')
}

let cartPage = async (req, res) => {
    return res.render('pages/cart.ejs')
}

let getProductDetailPage = async (req, res) => {
    let product_id = req.params.product_id;
    let [product] = await pool.execute('select * from products where product_id = ?', [product_id]);
    return res.render('pages/product__detail.ejs', { dataProduct: product[0] }); // x <- y
}

let productPage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM categorys');
    const [product] = await pool.execute('SELECT * FROM products');
    return res.render('pages/product.ejs', { dataCategory: rows, dataProduct: product})
}

module.exports = {
    homePage, loginPage, getProductDetailPage, cartPage, productPage
}