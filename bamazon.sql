DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
  VALUES ("Green Tea", "Beverages", 3.95, 17);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
  VALUES ("Mushroom Coffe", "Beverages", 7.95, 23);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
  VALUES ("Black Tea", "Beverages", 1.55, 129);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
  VALUES ("Alkaline Water", "Beverages", 5.75, 4);