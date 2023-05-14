const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "ashah2002",
    host: "localhost",
    port: 5432,
    database: "mini_project",
})

module.exports = pool;