import pool from '../configs/connectDB';

let getBrandPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM brands');

    return res.render('admin/list__brands.ejs', { dataBrand: rows })
}

let getDetailBrandPage = async (req, res) => {
    let brand_id = req.params.brand_id;
    let [brands] = await pool.execute('select * from brands where brand_id = ?', [brand_id]);
    return res.send(JSON.stringify(brands))
}

let addBrand = async (req, res) => {
    return res.render('admin/add__brand.ejs')
}

let createNewBrand = async (req, res) => {
    let { brand_name, brand_describe, link, logo } = req.body;

    await pool.execute('INSERT INTO `brands`(`brand_name`, `brand_describe`, `link`, `logo`) VALUES (?, ?, ?, ?)',
        [brand_name, brand_describe, link, logo]);

    return res.redirect('/brand-list')
}

let deleteBrand = async (req, res) => {
    let brand_id = req.body.brand_id;
    await pool.execute('delete from brands where brand_id = ?', [brand_id])
    return res.redirect('/brand-list');
}

let getEditBrandPage = async (req, res) => {
    let brand_id = req.params.brand_id;
    let [brands] = await pool.execute('select * from brands where brand_id = ?', [brand_id]);
    return res.render('admin/view__brand.ejs', { dataBrand: brands[0] }); // x <- y
}

let postUpdateBrand = async (req, res) => {
    let { brand_name, brand_describe, link, logo, brand_id } = req.body;

    await pool.execute('UPDATE `brands` SET `brand_name`= ? ,`brand_describe`= ?,`link`= ? ,`logo`= ? WHERE `brand_id`= ?',
        [brand_name, brand_describe, link, logo, brand_id]);

    return res.redirect('/brand-list');
}

module.exports = {
    getBrandPage, getDetailBrandPage, addBrand, createNewBrand, deleteBrand, getEditBrandPage, postUpdateBrand
}