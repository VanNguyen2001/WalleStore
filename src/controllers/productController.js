import pool from '../configs/connectDB';


let getProductPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM products');

    return res.render('admin/list__product.ejs', { dataProduct: rows})
}

let getDetailProductPage = async (req, res) => {
    let productId = req.params.id;
    let [product] = await pool.execute('select * from products where id = ?', [productId]);
    return res.send(JSON.stringify(product))
}

let addProduct = async (req, res) => {
    return res.render('admin/add__product.ejs')
}

let createNewProduct = async (req, res) => {
    let { name, describe, quantity, price, image, view, brandId, categoryId } = req.body;

    await pool.execute('INSERT INTO `products`(`name`, `describe`, `quantity`, `price`, `image`, `view`, `brandId`, `categoryId`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, describe, quantity, price, image, view, brandId, categoryId]);

    return res.redirect('/product-list')
}

let deleteProduct = async (req, res) => {
    let id = req.body.id;
    await pool.execute('delete from products where id = ?', [id])
    return res.redirect('/product-list');
}

let getEditProductPage = async (req, res) => {
    let id = req.params.id;
    let [product] = await pool.execute('select * from products where id = ?', [id]);
    return res.render('admin/view__product.ejs', { dataProduct: product[0] }); // x <- y
}

let postUpdateProduct = async (req, res) => {
    let { name, describe, quantity, price, image, view, brandId, categoryId } = req.body;

    await pool.execute('UPDATE `products` SET `name`= ? ,`describe`= ?,`quantity`= ?,`price`= ? ,`image`= ?,`view`= ?,`brandId`= ? ,`categoryId`= ? WHERE `id`= ?',
        [name, describe, quantity, price, image, view, brandId, categoryId]);

    return res.redirect('/product-list');
}

module.exports = {
    getProductPage, getDetailProductPage, addProduct, createNewProduct, deleteProduct, getEditProductPage, postUpdateProduct
}