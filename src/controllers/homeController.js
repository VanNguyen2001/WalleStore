import pool from '../config/connectDB';


let getAdminPage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM userdetail');

    return res.render('admin/userdetail__list.ejs', { datauserdetail: rows })
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

let getDetailPage = async (req, res) => {
    let userdetailId = req.params.id;
    let [userdetail] = await pool.execute('select * from userdetail where id = ?', [userdetailId]);
    return res.send(JSON.stringify(userdetail))
}

let createNewuserdetail = async (req, res) => {
    let { name, gender, email, phone, address } = req.body;

    await pool.execute('insert into userdetail(name, gender, email, phone, address) values (?, ?, ?, ?, ?)',
        [name, gender, email, phone, address]);

    return res.redirect('/')
}

let deleteuserdetail = async (req, res) => {
    let userdetailId = req.body.userdetailId;
    await pool.execute('delete from userdetail where id = ?', [userdetailId])
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [userdetail] = await pool.execute('Select * from userdetail where id = ?', [id]);
    return res.render('admin/update__userdetail.ejs', { datauserdetail: userdetail[0] }); // x <- y
}

let postUpdateuserdetail = async (req, res) => {
    let { name, gender, email, phone, address, id } = req.body;

    await pool.execute('update userdetail set name= ?, gender = ? , email = ? , phone = ? , address= ? where id = ?',
        [name, gender, email, phone, address, id]);

    return res.redirect('/');
}

module.exports = {
    getAdminPage, getHomePage, getDetailPage, createNewuserdetail, deleteuserdetail, getEditPage, postUpdateuserdetail, getLoginPage
}