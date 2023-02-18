import bcrypt from 'bcrypt'
import { pool } from '../server.js';


// New user Registration

export const userRegistration = async (req, res) => {
    const { username, image, number, email, password, role } = req.body;

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error hashing password');
        }

        // store the hashed password in the database
        pool.query('INSERT INTO userregistration (username, image, number, email, password, role) VALUES (?, ?, ?, ?, ?, ?)', [username, image, number, email, hash, role], (error, results, fields) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Error registering user');
            }

            res.status(200).send('User registered successfully');
        });
    });
}

//user Login

export const userLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // check if email exists in database
    pool.query('SELECT * FROM userregistration WHERE email = ?', [email], (error, results, fields) => {
        if (error) {
            res.status(500).send({ error: 'Server Error' });
        } else if (results.length === 0) {
            res.status(401).send({ error: 'Email not found' });
        } else {
            // compare hashed password with password provided by user
            const hashedPassword = results[0].password;
            bcrypt.compare(password, hashedPassword, (error, match) => {
                if (error) {
                    res.status(500).send({ error: 'Server Error' });
                } else if (!match) {
                    res.status(401).send({ error: 'Invalid Password' });
                } else {
                    res.status(200).send({ message: 'Login successful' });
                }
            });
        }
    });
}