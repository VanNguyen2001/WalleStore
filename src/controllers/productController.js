import pool from '../configs/connectDB';


let getProductPage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM product');

    return res.render('admin/list__product.ejs', { dataProduct: rows })
}

let getDetailProductPage = async (req, res) => {
    let productId = req.params.id;
    let [product] = await pool.execute('select * from product where id = ?', [productId]);
    return res.send(JSON.stringify(product))
}

let addProduct = async (req, res) => {
    return res.render('admin/add__product.ejs')
}

let createNewProduct = async (req, res) => {
    let { name, quantity, price, describe, image, view, categoryID, brandID } = req.body;

    await pool.execute('INSERT INTO `product`(`name`, `quantity`, `price`, `describe`, `image`, `view`, `categoryID`, `brandID`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, quantity, price, describe, image, view, categoryID, brandID]);

    return res.redirect('/product-list')
}

let deleteProduct = async (req, res) => {
    let productId = req.body.productId;
    await pool.execute('delete from product where id = ?', [productId])
    return res.redirect('/product-list');
}

let getEditProductPage = async (req, res) => {
    let id = req.params.id;
    let [product] = await pool.execute('select * from product where id = ?', [id]);
    return res.render('admin/update__product.ejs', { dataProduct: product[0] }); // x <- y
}

let postUpdateProduct = async (req, res) => {
    let { name, quantity, price, describe, image, view, categoryID, brandID, id } = req.body;
    await pool.execute('UPDATE `product` SET `name`= ? ,`quantity`= ?,`price`= ?,`describe`= ?,`image`= ?,`view`= ?,`categoryID`= ?,`brandID`= ? WHERE `id`= ?',
        [name, quantity, price, describe, image, view, categoryID, brandID, id]);

    return res.redirect('/product-list');
}

module.exports = {
    getProductPage, getDetailProductPage, addProduct, createNewProduct, deleteProduct, getEditProductPage, postUpdateProduct
}