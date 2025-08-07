const pool = require('../db')
const crypto = require('crypto');
const { createToken } = require('../services/authentication');
const { generateFromEmail } = require("unique-username-generator");


const handleUserSignup = async (req, res) => {
    //register user

    const formData = req.body;

    try {
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [formData.email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if (!formData.email || !formData.password || !formData.name) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = crypto.createHmac('sha256', salt).update(formData.password).digest('hex');

        
        const username =  generateFromEmail(formData.email, 3)

        const query = 'INSERT INTO users (name, email, username, password, salt) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [formData.name, formData.email, username, hashedPassword, salt];

        const result = await pool.query(query, values);
        const user = result.rows[0];
        if (!user) {
            return res.status(500).json({ message: 'User registration failed' });
        }
        // console.log("Inserted user:", result.rows[0]);
        
        // Create a token for the user
        const {token, payload} = createToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })

        return res.status(201).json({ message: 'Signup Successful', payload: payload });
    }
    catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const handleUserLogin = async (req, res) => {
    //login user

    const {email, password} = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try{
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const salt = user?.rows[0].salt
        const hashedPassword = user?.rows[0].password
        const hashedInputPassword = crypto.createHmac('sha256', salt).update(password).digest('hex');
        
        if (hashedInputPassword !== hashedPassword) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        const {token, payload} = createToken(user.rows[0])

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })
        return res.status(200).json({ message: 'Login Successful', payload: payload });
    }
    catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const handleUserLogout = async (req, res) => {
    //logout user
    
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    }).json({message: 'Logout Successful'});
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
};