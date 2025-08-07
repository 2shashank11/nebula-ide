const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function createToken(user){
    if (!user) {
        console.log(user)
        throw new Error('Invalid user object');
    }

    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        
    };

    const options = {
        expiresIn: '7d',
    };

    const token = JWT.sign(payload, secret, options);

    return {token, payload};
}

// function verifyToken(token) {
//     if (!token) {
//         throw new Error('Token is required for verification');
//     }

//     try {
//         const decoded = JWT.verify(token, secret);
//         return decoded;
//     } catch (error) {
//         throw new Error('Invalid or expired token');
//     }
// }

module.exports = {
    createToken, 
    // verifyToken
}