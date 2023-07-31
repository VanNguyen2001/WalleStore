import pool from '../configs/connectDB';

let listUsers = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM users');
    return res.render('admin/list__users.ejs', { dataUser: rows })
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
    let id = req.body.id;
    await pool.execute('delete from users where id = ?', [id])
    return res.redirect('/');
}

let editUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('Select * from users where id = ?', [id]);
    return res.render('admin/view__user.ejs', { dataUser: user[0] });
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
        [name, gender, new Date(), phone, address, password, role]);
    return res.redirect('/login');
}

let login = async (req, res) => {
    let { phone, password } = req.body;
    let [rows] = await pool.execute('SELECT * FROM users WHERE phone = ?', [phone]);

    if (rows.length > 0) {
        let user = rows[0];
        if (password === user.password) {
            // Passwords match, user is authenticated
            if (req.session?.userId) {
                req.session.userId = user.id;
            }
            // req.flash('success', 'Đăng nhập thành công');
            // return res.redirect('/'); // Redirect to the dashboard page or any other page


            // Show success message using JavaScript alert()
            const message = 'Đăng nhập thành công';
            const script = `<script>alert('${message}');window.location.href='/';</script>`;
            res.send(script);
            return;
        }
    }

    // Invalid phone number or password
    req.flash('error', 'Số điện thoại hoặc mật khẩu không đúng');
    return res.redirect('/login');

    // Invalid phone number or password
    // const message = 'Số điện thoại hoặc mật khẩu không đúng';
    // const script = `<script>alert('${message}');window.location.href='/login';</script>`;
    // res.send(script);
    // return;
}

module.exports = {
    listUsers, detailUser, createUser, deleteUser, editUser, updateUser, addUser, signUp, login
}