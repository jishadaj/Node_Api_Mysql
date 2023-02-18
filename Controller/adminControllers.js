import { pool } from '../server.js'


// Admin managment



// Get all user

export const getAllUsers = async (req, res) => {
    const query = 'SELECT id, username, email FROM userregistration';

    pool.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log(results);
    });
}

// Update User's information

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;

    const query = `UPDATE userregistration SET username = '${name}', email = '${email}' WHERE id = ${id}`;
    

    pool.query(query, (err, results) => {
        if (err) throw err;
        res.json({ message: `User with ID ${id} updated` });
    })
}

// Delete a user

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM userregistration WHERE id = ${id}`;
    // console.log(`${id}`);

    pool.query(query, (err, results) => {
        if (err) throw err;
        res.json({ message: `User with ID ${id} deleted` });
    });
}