const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "ecommerce",
    password: "admin",
    multipleStatements: true,
  });

  
connection.connect((err) => {
    if (err) throw err;
  });
  
  
module.exports = connection ;
