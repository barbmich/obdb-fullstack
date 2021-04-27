const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  host: "localhost",
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

db.connect();

module.exports = db;
