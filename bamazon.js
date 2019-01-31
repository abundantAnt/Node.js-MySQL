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
    start();
  });
  db.end();
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
      console.log(answers);
      var aID = answers.item;
      var aQ = answers.quantity;
      console.log(aID, aQ);

      db.query("SELECT * FROM products WHERE item_id=?", aID, function (err, results) {
      console.log(results)})
        //   // for (var i = 0; i < results.length; i++) {
          

      //     // if (aQ > res[i].stock_quantity) {

      //     //   console.log("Sorry! Not enough in stock. Please try again later.");
      //     //   start();

      //     // } else {
      //     //   console.log("Awesome! We can fulfull your order.");
          //   console.log("You've selected:");
          //   console.log("Item: " + results[i].product_name);
          //   console.log("Department: " + results[i].department_name);
          //   console.log("Price: " + results[i].price);
          //   console.log("Quantity: " + aQ);
          //   console.log("Total: " + results[i].price * aID);

          //   var newStock = (results[i].stock_quantity - aQ);
          //   var purchaseId = (aID);
          //   //console.log(newStock);
          //   confirmPrompt(newStock, purchaseId);

          // console.log(results);
    })
        
  }
    