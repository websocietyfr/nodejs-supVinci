const express = require('express')
const router = express.Router()
const { getAllAnnonces, uploadFiles, createAnnonce, sendComment, getFile } = require('../services/annonces');
const { route } = require('./authenticate');

router.get('/', getAllAnnonces);

router.post('/uploadFiles', uploadFiles);

router.get('/getFile/:path', getFile);

router.post('/sendComment', sendComment)

router.post('/', createAnnonce);

module.exports = router