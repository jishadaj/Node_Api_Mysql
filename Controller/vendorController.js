import { pool } from '../server.js'

// register vendor

export const vendorRegister = async (req, res) => {
    const { name, contactPerson, email, phone, address, city, state, zipCode, country } = req.body;

    pool.query('INSERT INTO vendor (name, contact_person, email, phone, address, city, state, zip_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, contactPerson, email, phone, address, city, state, zipCode, country], (error, results, fields) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error registering user');
        }

        res.status(200).send('User registered successfully');
    });
};

// Create a new product

export const addProduct = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        vendor_id: req.params.vendorId
    };

    const sql = `INSERT INTO product (name, price, quantity, category, vendor_id) VALUES ('${product.name}', '${product.price}', '${product.quantity}', '${product.category}', '${product.vendor_id}')`;

    pool.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error creating product' });
        } else {
            res.send({ message: 'Product created' });
        }
    });
}

// Get all product

export const getAllProduct = async (req, res) => {
    const sql = 'SELECT * FROM product';

    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
}

//Get product By Id

export const getProductById = async (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM product WHERE id = ${id}`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
}

// Update Product

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, price, quantity, category } = req.body;
    const sql = `UPDATE product SET name='${name}', price='${price}', quantity='${quantity}', category='${category}'  WHERE id = ${id}`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Product updated');
    });
}

// Delete product

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM product WHERE id = ${id}`;
    pool.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Product deleted');
    });
}

// getActiveProducts

export const getActiveProducts = async (req, res) => {
    const page = req.query.page || 1;
    const offset = (page - 1) * 10;
    const query = 'SELECT * FROM product WHERE isActive = ? LIMIT 10 OFFSET ?';
    const values = [true, offset];
    pool.query(query, values, (err, results) => {
        if (err) {
            console.error('Error querying MySQL database: ' + err.stack);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
}