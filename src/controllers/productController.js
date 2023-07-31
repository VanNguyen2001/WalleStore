import pool from '../configs/connectDB';


let getProductPage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM products');

    return res.render('admin/list__product.ejs', { dataProduct: rows })
}

let getDetailProductPage = async (req, res) => {
    let product_id = req.params.id;
    let [product] = await pool.execute('select * from products where id = ?', [product_id]);
    return res.send(JSON.stringify(product))
}

let addProduct = async (req, res) => {
    const [brand] = await pool.execute('SELECT * FROM brands');
    const [category] = await pool.execute('SELECT * FROM categorys');
    return res.render('admin/add__product.ejs', { dataBrand: brand, dataCategory: category })
}

let createNewProduct = async (req, res) => {
    let { product_name, product_describe, quantity, price, product_image, view, brand_id, category_id } = req.body;

    await pool.execute('INSERT INTO `products`(`product_name`, `product_describe`, `quantity`, `price`, `product_image`, `view`, `brand_id`, `category_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [product_name, product_describe, quantity, price, product_image, view, brand_id, category_id]);

    return res.redirect('/product-list')
}

let deleteProduct = async (req, res) => {
    let product_id = req.body.product_id;
    await pool.execute('delete from products where product_id = ?', [product_id])
    return res.redirect('/product-list');
}

let getEditProductPage = async (req, res) => {
    let product_id = req.params.product_id;
    let [product] = await pool.execute('select * from products where product_id = ?', [product_id]);
    return res.render('admin/view__product.ejs', { dataProduct: product[0] }); // x <- y
}

let postUpdateProduct = async (req, res) => {
    let { product_name, product_describe, quantity, price, product_image, view, brand_id, category_id, product_id } = req.body;

    await pool.execute('UPDATE `products` SET `product_name`=?,`product_describe`=?,`quantity`=?,`price`=?,`product_image`=?,`view`=?,`brand_id`=?,`category_id`=? WHERE `product_id`=?',
        [product_name, product_describe, quantity, price, product_image, view, brand_id, category_id, product_id]);

    return res.redirect('/product-list');
}

module.exports = {
    getProductPage, getDetailProductPage, addProduct, createNewProduct, deleteProduct, getEditProductPage, postUpdateProduct
}