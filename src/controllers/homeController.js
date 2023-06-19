import pool from '../config/connectDB';


let getAdminPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('admin/users__list.ejs', { datausers: rows })
}

let getLoginPage = async (req, res) => {
    return res.render('pages/login.ejs')
}


let getHomePage = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM category');
    const [roll] = await pool.execute('SELECT * FROM brand');
    const [product] = await pool.execute('SELECT * FROM product');

    return res.render('pages/index.ejs', { dataCategory: rows, dataBrand: roll, dataProduct: product })
}

let getUsersPage = async (req, res) => {
    let usersId = req.params.id;
    let [users] = await pool.execute('select * from users where id = ?', [usersId]);
    return res.send(JSON.stringify(users))
}

let createNewusers = async (req, res) => {
    let { name, gender, birthDay, phone, address, password, role } = req.body;

    await pool.execute('INSERT INTO `users`(`name`, `gender`, `birthDay`, `phone`, `address`, `password`, `role`) values (?, ?, ?, ?, ?, ?, ?)',
        [name, gender, birthDay, phone, address, password, role]);

    return res.redirect('/')
}

let deleteusers = async (req, res) => {
    let id = req.body.id;
    await pool.execute('delete from users where id = ?', [id])
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [users] = await pool.execute('Select * from users where id = ?', [id]);
    return res.render('admin/update__users.ejs', { datausers: users[0] }); // x <- y
}

let postUpdateusers = async (req, res) => {
    let { name, gender, birthDay, phone, address, password, role, id } = req.body;

    await pool.execute('update users set name= ?, gender = ? , birthDay = ? , phone = ? , address= ? , password = ? , role = ?  where id = ?',
        [name, gender, birthDay, phone, address, password, role, id]);

    return res.redirect('/');
}

module.exports = {
    getAdminPage, getHomePage, getUsersPage, createNewusers, deleteusers, getEditPage, postUpdateusers, getLoginPage
}