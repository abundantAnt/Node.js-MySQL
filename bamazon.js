var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: process.env.rootHost,
  port: process.env.rootPort,
  user: process.env.rootName,
  password: process.env.rootPassword,
  database: process.env.rootDB
});

connection.connect((err) => {
  if (err) { throw err };
  console.log("🎼 => Connected to the database");
  itemsForSale();
});

function itemsForSale() {
  
connection.query('SELECT * FROM products', function (error, results) {
  if (error) throw error;
  console.log(results);
  
  var table = new Table({
    head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity']
  , colWidths: [15, 50, 50, 15, 15]
});
 
  for (let i = 0; i < results.length; i++) {
    
    table.push(
      ['First value', 'Second value']
    , ['First value', 'Second value']
  }

);
 
console.log(table.toString());
});
 
connection.end();

};



  

