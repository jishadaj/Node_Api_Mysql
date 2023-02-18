import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import User from './Routes/User.js'
import Admin from './Routes/Admin.js'
import Vendor from './Routes/Vendor.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'node_app'
})

pool.query(`use node_app`, (err, result, fields)=>{
    if(err){
        return console.log(err);
    }
    return console.log("Mysql connected");
})

app.use('/', User) 
app.use('/admin',Admin)
app.use('/vendor',Vendor)


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});




 