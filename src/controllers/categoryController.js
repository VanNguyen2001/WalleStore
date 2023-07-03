import pool from '../configs/connectDB';


let getCategoryPage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM categorys');

    return res.render('admin/list__categorys.ejs', { dataCategory: rows})
}

let getDetailCategoryPage = async (req, res) => {
    let category_id = req.params.id;
    let [categorys] = await pool.execute('select * from categorys where category_id = ?', [category_id]);
    return res.send(JSON.stringify(categorys))
}

let addCategory = async (req, res) => {
    return res.render('admin/add__category.ejs')
}

let createNewCategory = async (req, res) => {
    let { category_name, category_describe, category_image } = req.body;

    await pool.execute('INSERT INTO `categorys`(`category_name`, `category_describe`, `category_image`) VALUES (?,?,?)',
        [category_name, category_describe, category_image]);

    return res.redirect('/category-list')
}

let deleteCategory = async (req, res) => {
    let category_id = req.body.category_id;
    await pool.execute('delete from categorys where category_id = ?', [category_id])
    return res.redirect('/category-list');
}

let getEditCategoryPage = async (req, res) => {
    let category_id = req.params.category_id;
    let [categorys] = await pool.execute('select * from categorys where category_id = ?', [category_id]);
    return res.render('admin/view__category.ejs', { dataCategory: categorys[0] }); // x <- y
}

let postUpdateCategory = async (req, res) => {
    let { category_name, category_describe, category_image, category_id } = req.body;

    await pool.execute('UPDATE `categorys` SET `category_name`= ? ,`category_describe`= ?,`category_image`= ? WHERE `category_id`= ?',
        [category_name, category_describe, category_image, category_id]);

    return res.redirect('/category-list');
}

module.exports = {
    getCategoryPage, getDetailCategoryPage, addCategory, createNewCategory, deleteCategory, getEditCategoryPage, postUpdateCategory
}