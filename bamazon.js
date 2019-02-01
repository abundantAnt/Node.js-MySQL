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

db.connect((err) => {
  if (err) {
    throw err
  };
  console.log("\n\n    You are connected to BAMAZON!!!!");
  itemsForSale();
});

function itemsForSale() {

  db.query('SELECT * FROM products', function (error, results) {
    if (error) throw error;

    console.log("========================================");
    console.log("       Check out our inventory          ");
    console.log("========================================");

    var table = new Table({
      head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity'],
      colWidths: [10, 25, 25, 10, 10]
    });

    for (let i = 0; i < results.length; i++) {

      table.push(
        [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
      )
    };
    console.log(table.toString());
    console.log('\r\n');
    start();
  });
};

function start() {
  inquirer
    .prompt([{
        name: "item",
        type: "input",
        message: "Which item you would like to buy?",
        default: 1,
        validate: function (input) {
          return !isNaN(input);
        },
        filter: function (input) {
          return parseInt(input);
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy at this time?",
        default: 5,
        validate: function (input) {
          return !isNaN(input);
        },
        filter: function (input) {
          return parseInt(input);
        }
      }
    ])
    .then(function (answers) {

      let queryDB = "SELECT * FROM products WHERE item_id = ?";

      db.query(queryDB, answers.item, function (err, results) {


        if (err) throw err;

        const custItem = parseInt(answers.item);
        const custAmt = parseInt(answers.quantity);
        const dbAmt = results.length ? parseInt(results[0].stock_quantity) : "";
        // console.log(results[0].stock_quantity);
        console.log("custItem: ", custItem);
        console.log("custAmt: ", custAmt);
        console.log("dbAmt: ", dbAmt);

        if (dbAmt == "") {
          console.log("\r\n Sorry, we do not have that item.  Please try again. \r\n");
          start();
        } else if (custAmt > dbAmt) {
          console.log("\r\n Sorry, we do not have that many.  Please try again. \r\n");
          start();
        } else {
          console.log(`\r\n Thank you for purchansing ${custAmt} ${results[0].product_name}. Your total is  Please come again. \r\n`);
          start();
        }
      })
    });
};