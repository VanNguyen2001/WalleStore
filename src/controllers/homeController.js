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

module.exports = {
    homePage, loginPage
}