import pool from '../config/connectDB';


let getCategoryPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM category');

    return res.render('admin/category__list.ejs', { dataCategory: rows, test: 'abc string test' })
}

let getDetailCategoryPage = async (req, res) => {
    let categoryId = req.params.id;
    let [category] = await pool.execute('select * from category where id = ?', [categoryId]);
    return res.send(JSON.stringify(category))
}

let createNewCategory = async (req, res) => {
    let { name, describe, image } = req.body;

    await pool.execute('INSERT INTO `category`(`name`, `describe`, `image`) VALUES (?, ?, ?)',
        [name, describe, image]);

    return res.redirect('/category-list')
}

let deleteCategory = async (req, res) => {
    let categoryId = req.body.categoryId;
    await pool.execute('delete from category where id = ?', [categoryId])
    return res.redirect('/category-list');
}

let getEditCategoryPage = async (req, res) => {
    let id = req.params.id;
    let [category] = await pool.execute('select * from category where id = ?', [id]);
    return res.render('admin/update__category.ejs', { dataCategory: category[0] }); // x <- y
}

let postUpdateCategory = async (req, res) => {
    let { name, describe, image, id } = req.body;

    await pool.execute('UPDATE `category` SET `name`= ? ,`describe`= ?,`image`= ? WHERE `id`= ?',
        [name, describe, image, id]);

    return res.redirect('/category-list');
}

module.exports = {
    getCategoryPage, getDetailCategoryPage, createNewCategory, deleteCategory, getEditCategoryPage, postUpdateCategory
}