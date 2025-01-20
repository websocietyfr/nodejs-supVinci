const jwt = require('jsonwebtoken')

module.exports = {
    validateAuthentication
}

function validateAuthentication(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'No token provided' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).send({ message: 'Failed to authenticate token' });
        req.user = decoded.user;
        next();
    });
}
