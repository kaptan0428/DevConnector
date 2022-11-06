const jwt = require('jsonwebtoken'); 
const config = require('config');
const c = require('config');

module.exports = function(req, res, next){
    // Get the Token from Header
    const token = req.header('x-auth-token'); 

    // check if No Token
    if(!token) {
        return res.status(401).json({msg: 'No Token, Authorization denied'}); 
    }
    // Verify Token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret')); 

        req.user = decoded.user; 
        next(); 

    } catch(err) {
        res.status(401).json({msg: 'Token is not valid'}); 
    }
}
