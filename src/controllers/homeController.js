import pool from '../configs/connectDB';

let homePage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM categorys');
    const [roll] = await pool.execute('SELECT * FROM brands');
    const [product] = await pool.execute('SELECT * FROM products');

    return res.render('pages/index.ejs', { dataCategory: rows, dataBrand: roll, dataProduct: product})
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

module.exports = {
    homePage, loginPage, getProductDetailPage, cartPage
}