const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({message: "Unauthorized Access"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(403).json({message: "Invalid or Expired Token"})
    }
}

module.exports = authenticate;