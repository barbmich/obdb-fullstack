const { Pool } = require("pg");
const fs = require("fs");
require("dotenv").config();

const db = new Pool({
  host: "localhost",
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_TEST_NAME
      : process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

module.exports = db;
