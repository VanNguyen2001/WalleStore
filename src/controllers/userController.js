import pool from '../configs/connectDB';
const dayjs = require('dayjs')


let listUsers = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM users');
<<<<<<< HEAD
    return res.render('admin/list__users.ejs', { dataUser: rows })
=======
    rows.map((item)=>{
        item.birthDay = dayjs(item.birthDay).format('DD-MM-YYYY')
    })
    return res.render('admin/list__users.ejs', { dataUser: rows})
>>>>>>> 8d1124fd0dc7adacf926b300f75ad6113d767f3a
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
    user.map((item)=>{
        item.birthDay = dayjs(item.birthDay).format('DD-MM-YYYY')
    })
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
<<<<<<< HEAD
    listUsers, detailUser, createUser, deleteUser, editUser, updateUser, addUser, signUp, login
=======
    listUsers, createUser, deleteUser, editUser, updateUser, addUser, signUp, login
>>>>>>> 8d1124fd0dc7adacf926b300f75ad6113d767f3a
}