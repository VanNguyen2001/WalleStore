import pool from '../configs/connectDB';


let getHomePage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM brand');

    return res.render('pages/index.ejs', { dataBrand: rows, test: 'abc string test' })
}

module.exports = {
    getHomePage
}