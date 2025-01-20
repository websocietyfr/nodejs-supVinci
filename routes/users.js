const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { validateUser } = require('../middlewares/users')
const { getAllUsers, getCurrentUser } = require('../services/users')

router.post('/register', (req, res, next) => {
    res.send('hello world!')
})

router.post('/login', (req, res, next) => {
    res.send('hello world!')
})

router.put('/:id', (req, res, next) => {
    res.send(req.params)
})

// router.post('/', [body('nom').notEmpty(), body('password').notEmpty()], (req, res, next) => {
    
//     const result = validationResult(req);

//     if(!result.isEmpty()) {
//         res.status(400).send('Erreur de nom');
//     }

//     res.status(201).json({
//         statut: "succès"
//     })
// })

router.post('/', validateUser, (req,res,next) => {
    res.status(201).json({
        status: "success"
    })
});

router.get('/', getAllUsers);

router.get('/me', getCurrentUser);

module.exports = router