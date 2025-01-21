const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { validateUser } = require('../middlewares/users')
const { getAllUsers, getCurrentUser } = require('../services/users')

router.put('/:id', (req, res, next) => {
    // TODO
    res.send(req.params)
})

router.post('/', validateUser, (req,res,next) => {
    res.status(201).json({
        status: "success"
    })
});

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

module.exports = router