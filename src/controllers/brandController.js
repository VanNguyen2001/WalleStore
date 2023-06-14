import pool from '../configs/connectDB';


let getBrandPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM brand');

    return res.render('admin/list__brands.ejs', { dataBrand: rows, test: 'abc string test' })
}

let getDetailBrandPage = async (req, res) => {
    let brandId = req.params.id;
    let [brand] = await pool.execute('select * from brand where id = ?', [brandId]);
    return res.send(JSON.stringify(brand))
}

let addBrand = async (req, res) => {
    return res.render('admin/add__brand.ejs')
}

let createNewBrand = async (req, res) => {
    let { name, describe, link, logo } = req.body;

    await pool.execute('INSERT INTO `brand`(`name`, `describe`, `link`, `logo`) VALUES (?, ?, ?, ?)',
        [name, describe, link, logo]);

    return res.redirect('/brand-list')
}

let deleteBrand = async (req, res) => {
    let brandId = req.body.brandId;
    await pool.execute('delete from brand where id = ?', [brandId])
    return res.redirect('/brand-list');
}

let getEditBrandPage = async (req, res) => {
    let id = req.params.id;
    let [brand] = await pool.execute('select * from brand where id = ?', [id]);
    return res.render('admin/update__brand.ejs', { dataBrand: brand[0] }); // x <- y
}

let postUpdateBrand = async (req, res) => {
    let { name, describe, link, logo, id } = req.body;

    await pool.execute('UPDATE `brand` SET `name`= ? ,`describe`= ?,`link`= ? ,`logo`= ? WHERE `id`= ?',
        [name, describe, link, logo, id]);

    return res.redirect('/brand-list');
}

module.exports = {
    getBrandPage, getDetailBrandPage, addBrand, createNewBrand, deleteBrand, getEditBrandPage, postUpdateBrand
}