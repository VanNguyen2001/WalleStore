import pool from '../configs/connectDB';


let getStorehousePage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM products');

    return res.render('admin/list__storehouse.ejs', { dataProduct: rows})
}

let getDetailStorehousePage = async (req, res) => {
    let product_id = req.params.id;
    let [product] = await pool.execute('select * from products where id = ?', [product_id]);
    return res.send(JSON.stringify(product))
}

let createNewStorehouse = async (req, res) => {
    let { product_name, product_describe, quantity, price, product_image, view, brand_id, category_id } = req.body;

    await pool.execute('INSERT INTO `products`(`product_name`, `product_describe`, `quantity`, `price`, `product_image`, `view`, `brand_id`, `category_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [product_name, product_describe, quantity, price, product_image, view, brand_id, category_id]);

    return res.redirect('/storehouse-list')
}

let getEditStorehousePage = async (req, res) => {
    let product_id = req.params.product_id;
    let [product] = await pool.execute('select * from products where product_id = ?', [product_id]);
    return res.render('admin/list-storehouse.ejs', { dataProduct: product[0] }); // x <- y
}

let postUpdateStorehouse = async (req, res) => {
    let { product_name, product_describe, quantity, price, product_image, view, brand_id, category_id } = req.body;

    await pool.execute('UPDATE `products` SET `product_name`=?,`product_describe`=?,`quantity`=?,`price`=?,`product_image`=?,`view`=?,`brand_id`=?,`category_id`=? WHERE `product_id`=?',
        [product_name, product_describe, quantity, price, product_image, view, brand_id, category_id]);

    return res.redirect('/storehouse-list');
}

module.exports = {
    getStorehousePage, getDetailStorehousePage, createNewStorehouse, getEditStorehousePage, postUpdateStorehouse
}