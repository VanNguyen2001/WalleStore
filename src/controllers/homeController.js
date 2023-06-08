import pool from '../configs/connectDB';

let getHomePage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM category');
    const [roll] = await pool.execute('SELECT * FROM brand');
    const [ron] = await pool.execute('SELECT * FROM product');

    return res.render('pages/index.ejs', { dataCategory: rows, dataBrand: roll, dataProduct: ron })
}

let child = async (req, res) => {
    return res.render('admin/child.ejs')
}

module.exports = {
    getHomePage, child
}