const express = require('express');
const path = require('path'); // Make sure to require 'path'
const mysql = require('mysql');
const body_parser = require('body-parser');
const session = require('express-session');

const app = express();

app.use( express.static( "views" ) );

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(express.static('public'));

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure this path is correct

// Make MySQL Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'cart(sql)',
    user: 'root',
    password: ''
});

// Check MySQL Database Connection
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL Database:', error);
        return;
    }
    console.log('MySQL Database is connected Successfully');
});

// Set up Session Middleware
app.use(session({
    secret: '1234567890abcdefghijklmnopqrstuvwxyz',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

// Create Route for Load Product Data
app.get("/", (request, response) => {
    const query = `SELECT * FROM product `;

    // Execute Query
    connection.query(query, (error, result) => {
        if (error) {
            console.error('Error executing query:', error);
            return response.status(500).send('Internal Server Error');
        }

        if (!request.session.cart) {
            request.session.cart = [];
        }

        response.render('product', { products: result, cart: request.session.cart });
    });
});

// Create Route for Add Item into Cart
app.post('/add_cart', (request, response) => {
    const product_id = request.body.product_id;
    const product_name = request.body.product_name;
    const product_price = request.body.product_price;

    let count = 0;

    for (let i = 0; i < request.session.cart.length; i++) {
        if (request.session.cart[i].product_id === product_id) {
            request.session.cart[i].quantity += 1;
            count++;
        }
    }

    if (count === 0) {
        const cart_data = {
            product_id: product_id,
            product_name: product_name,
            product_price: parseFloat(product_price),
            quantity: 1
        };

        request.session.cart.push(cart_data);
    }

    response.redirect("/");
});

// Create Route for Remove Item from Shopping Cart
app.get('/remove_item', (request, response) => {
    const product_id = request.query.id;

    for (let i = 0; i < request.session.cart.length; i++) {
        if (request.session.cart[i].product_id === product_id) {
            request.session.cart.splice(i, 1);
            break; // Exit the loop after removing the item
        }
    }

    response.redirect("/");
});

app.listen(3000, () => {
    console.log('Server has started on port number 3000');
});
