const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    try 
    {
        const token = (req.cookies).token.token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } 
        else 
        {
            next();
        }
    }
    catch 
    {
        res.status(401).json({
            error: new Error('Invalid request!')
        })
    }
}

module.exports = authToken