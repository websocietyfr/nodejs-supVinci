const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
    validateAuthentication
}

function validateAuthentication(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'No token provided' });

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) return res.status(403).send({ message: 'Failed to authenticate token' });
        const user = await User.findOne({ where: { id: decoded.user.id }});
        if (user.token !== token) return res.status(403).send({ message: 'Session expired' });
        req.user = user;
        // req.user = decoded.user;
        next();
    });
}
