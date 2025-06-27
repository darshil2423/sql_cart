 # MarketMingle - Add to Cart (SQL)

A simple shopping cart web application built with **Express.js**, **EJS**, **MySQL**, and **Bootstrap**. Users can browse products, add them to a cart, and remove items—all with session-based cart management.

## Features

- Display products from a MySQL database
- Add products to a shopping cart (session-based)
- Remove items from the cart
- Responsive UI with Bootstrap
- Product images support

## Tech Stack

- **Backend:** Express.js, Node.js
- **Frontend:** EJS templates, Bootstrap
- **Database:** MySQL
- **Session Management:** express-session

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MySQL](https://www.mysql.com/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd Add_Cart(sql)
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the MySQL database

- Create a database named `cart(sql)` (or update the name in `server.js`).
- Create a `product` table with at least the following columns:
  - `product_id` (Primary Key, INT)
  - `product_name` (VARCHAR)
  - `product_price` (FLOAT or DECIMAL)
  - `product_image` (VARCHAR, stores image filename, e.g., `image-1.jpeg`)

**Example SQL:**
```sql
CREATE DATABASE `cart(sql)`;
USE `cart(sql)`;

CREATE TABLE `product` (
  `product_id` INT PRIMARY KEY AUTO_INCREMENT,
  `product_name` VARCHAR(255),
  `product_price` DECIMAL(10,2),
  `product_image` VARCHAR(255)
);

-- Insert sample data
INSERT INTO `product` (`product_name`, `product_price`, `product_image`) VALUES
('Sample Product 1', 10.99, 'image-1.jpeg'),
('Sample Product 2', 15.49, 'image-2.jpeg');
```

- Place product images in the `views/images/` directory. Filenames should match the `product_image` field in your database.

### 4. Configure database credentials

Update the MySQL connection settings in `server.js` if your username or password is different:

```js
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'cart(sql)',
    user: 'root',
    password: ''
});
```

### 5. Run the application

```bash
node server.js
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Add_Cart(sql)/
  ├── server.js
  ├── package.json
  ├── views/
  │   ├── product.ejs
  │   └── images/
  │       └── image-1.jpeg, image-2.jpeg, ...
```



## License

This project is licensed under the ISC License.
