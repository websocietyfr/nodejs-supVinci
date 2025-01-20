const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, sequelize } = require('../models')

router.post('/register', async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedpassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedpassword
        }, { transaction })

        transaction.commit();
        return res.status(201).json({
            status: "success",
            user: user.cleanUser()
        })
    } catch(err) {
        transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: "error",
            details: err.errors
        })
    }
    
});

router.post('/login', async (req, res, next) => {
    try {
        const body = req.body;
        
        const user = await User.findOne({ 
            where: { email: body.email },
            attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
        });
        if(!user) return res.status(404).json({ status: "Not fournd" });

        const isPasswordValidated = await bcrypt.compare(body.password, user.password);
        if(!isPasswordValidated) return res.status(401).json({ status: "Incorrect password" });

        const token = jwt.sign({ user: user.cleanUser() }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ token, user: user.cleanUser() });
    } catch(err) {
        console.log('ERROR', err);
        return res.status(400).json({
            status: "error",
            details: err
        })
    }
    
});

router.get('/logout', async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'No token provided' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' });
        const newToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, { expiresIn: '1s' });
        res.send({ message: 'unlogged !', token: newToken });
    });
})

module.exports = router;