DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Laundry basket", "Home Goods", 14.99, 100),
("Bath Towel", "Home Goods", 9.99, 100),
("Shower Mat", "Home Goods", 12.49, 75),
("Shower Cap", "Home Goods", 9.99, 200),
("Bannanas", "Produce", .50, 500),
("Apple", "Produce", .25, 300),
("Mango", "Produce", .75, 300),
("Bat", "Sports", 19.99, 100),
("Basketball", "Sports", 19.99, 100),
("Golf Club", "Sports", 69.99, 50);