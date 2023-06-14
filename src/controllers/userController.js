import pool from '../configs/connectDB';

let listUsers = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM users');
    return res.render('admin/list__users.ejs', { dataUser: rows})
}

let detailUser = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [userId]);
    return res.send(JSON.stringify(user))
}

let addUser = async (req, res) => {
    return res.render('admin/add__user.ejs')
}

let createUser = async (req, res) => {
    let { name, gender, birthDay, phone, address, password, role } = req.body;
    await pool.execute('insert into users(name, gender, birthDay, phone, address, password, role) values (?, ?, ?, ?, ?, ?, ?)',
        [name, gender, birthDay, phone, address, password, role]);
    return res.redirect('/')
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('delete from users where id = ?', [userId])
    return res.redirect('/');
}

let editUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('Select * from users where id = ?', [id]);
    return res.render('admin/update__user.ejs', { dataUser: user[0] });
}

let updateUser = async (req, res) => {
    let { name, gender, birthDay, phone, address, password, role, id } = req.body;
    await pool.execute('update users set name= ?, gender = ? , birthDay = ? , phone= ?, address= ?, password = ? , role= ? where id = ?',
        [name, gender, birthDay, phone, address, password, role, id]);
    return res.redirect('/');
}

let signUp = async (req, res) => {
    let { name, gender, birthDay, phone, address, password, role } = req.body;
    await pool.execute('insert into users(name, gender, birthDay, phone, address, password, role) values (?, ?, ?, ?, ?, ?, ?)',
        [name, gender, birthDay, phone, address, password, role]);
    return res.redirect('/login')
}

module.exports = {
    listUsers, detailUser, createUser, deleteUser, editUser, updateUser, addUser, signUp
}