var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();
var Table = require('cli-table');

var db = mysql.createConnection({
  host: process.env.rootHost,
  port: process.env.rootPort,
  user: process.env.rootName,
  password: process.env.rootPassword,
  database: process.env.rootDB
});

var aID = 1;
var aQ = 2;


db.connect((err) => {
  if (err) {
    throw err
  };
  console.log("\n\n    You are connected to BAMAZON!!!!");
});


const qS = "SELECT * FROM products WHERE item_id = ?";

const query = db.query(qS, [aID], function (err, res) {
  console.log(res);
  if (res.length > 0) {
    if (aQ > res[0].stock_quantity) {
      console.log('\r\n');
      console.log("Sorry, this amount is greater thaan what we have in inventory at this time.  Please try again.");
      console.log('\r\n');
      setTimeout(function () {
        itemsForSale()
      }, 1000);
    } else {
      const qS2 = "UPDATE products SET stock_quantity=? WHERE item_id=?";
      db.query(qS2, aQ, aID, function (err, res) {
        console.log('\r\n');
        console.log('Your purchase has been completed');
      })

    }
  } else {
    console.log('\r\n');
    console.log("sorry, you pick item which is not in our inventory.  Please try again");
    setTimeout(function () {
      itemsForSale()
    }, 1000);
  }
})
console.log(query.sql);