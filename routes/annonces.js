const express = require('express')
const router = express.Router()
const { getAllAnnonces, uploadFiles, createAnnonce, sendComment } = require('../services/annonces');
const { route } = require('./authenticate');

router.get('/', getAllAnnonces);

router.post('/uploadFiles', uploadFiles);

router.post('/', createAnnonce);

router.post('/sendComment', sendComment)

// router.post('/register', (req, res, next) => {
//     res.send('hello world!')
// })

// router.post('/login', (req, res, next) => {
//     res.send('hello world!')
// })

// router.put('/:id', (req, res, next) => {
//     res.send(req.params)
// })

// router.post('/', [body('nom').notEmpty(), body('password').notEmpty()], (req, res, next) => {
    
//     const result = validationResult(req);

//     if(!result.isEmpty()) {
//         res.status(400).send('Erreur de nom');
//     }

//     res.status(201).json({
//         statut: "succès"
//     })
// })

module.exports = router