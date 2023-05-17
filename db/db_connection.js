const { createConnection } = require('mysql2')
const mysql = require('mysql2')
const dotenv = require('dotenv')

// const dbConfig = {
//     host: "<hostname>",
//     port: 3306,
//     user: "<usernanme>",
//     password: "<password>",
//     databse: "<schema>",
//     connectionTimeout: 10000
// }

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || "10000")
};
const connection = mysql.createConnection(dbConfig);

module.exports = connection;
