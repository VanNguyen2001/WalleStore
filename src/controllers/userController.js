import pool from '../configs/connectDB';

let listUsers = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM users');
    return res.render('admin/list__user.ejs', { dataUser: rows})
}

let detailUser = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [userId]);
    return res.send(JSON.stringify(user))
}

let createUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)',
        [firstName, lastName, email, address]);
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
    let { firstName, lastName, email, address, id } = req.body;
    await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
        [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

module.exports = {
    listUsers, detailUser, createUser, deleteUser, editUser, updateUser
}