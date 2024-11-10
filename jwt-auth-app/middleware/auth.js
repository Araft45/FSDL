const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Assuming "Bearer <token>"

    if (!token) {
        return res.status(403).send('Access denied');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send('Access denied');
        }
        req.user = user; // Attach the decoded user to the request
        next();
    });
}

module.exports = authenticateJWT;
