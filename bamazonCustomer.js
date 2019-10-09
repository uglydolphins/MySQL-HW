// npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// syncing database
var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    password:"",
    database: "bamazon"  
});

// creates connection and showsInventory
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    showInventory();
})

// load the product table from the database and prints everything to terminal
function showInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // shows table in terminal
        console.table(res);

        // asks for customer to make their selection
        askItem(res);
    });
}

// Prompt the customer for a product ID
function askItem(inventory) {
    // asks what they would like to purchase
    inquirer
        .prompt([
            {
                type: "input",
                name: "choice",
                message:"ID of item you wish to buy?",
                validate: function(val) {
                    return !isNaN(val) || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function(val) {
            // check if the user wants to quit the app
            quit(val.choice);
            var choiceId = parseInt(val.choice);
            var product = checkInventory(choiceId, inventory);

            // if product id is valid ask for quantity
            if (product) {
                askQuantity(product);
            }
            else {
                console.log("\nDon't have that");
                console.log("*******************")
                showInventory();
            }
        });
}

// ask for quantity function

function askQuantity(product) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "Purchase quantity?",
                validate: function(val) {
                    return val > 0 || val.toLowerCase() === "q";
                }
            }
        ])
        .then(function(val) {
            // checks if user wants to quit
            quit(val.quantity);
            var quantity = parseInt(val.quantity);

            // if not enough quantity let user know and reload app
            if(quantity > product.stock_quantity) {
                console.log("\nNot enough in stock!");
                showInventory();
            }
            else {
                // if in stock make purchase
                subtractQuantity(product, quantity);
            }
        });
}

// minus the stock quantity from the item
function subtractQuantity(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
        [quantity, product.item_id],
        function(err, res) {
            console.log("\nPurchased " + quantity + " " + product.product_name )
            showInventory();
        }
    )
}

// Check to see if the product exists
function checkInventory(choiceId, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].item_id === choiceId) {
            return inventory[i];
        }
    }

    return null;
}

// checks to see if user wants to quit
function quit(choice) {
    if (choice.toLowerCase() === "q") {
        console.log("Quit");
        process.exit(0)
    }
}