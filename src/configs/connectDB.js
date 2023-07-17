import mysql from 'mysql2/promise';

// // create the connection to database

console.log("Đang kết nối...");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic',
    // password: 'password'
})


export default pool;