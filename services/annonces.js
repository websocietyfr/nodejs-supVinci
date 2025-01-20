const { mailer } = require('./mailer')
const { Annonce, sequelize } = require('../models')
const formidable = require('formidable');
const fs = require('fs');


module.exports = {
    getAllAnnonces,
    uploadFiles,
    createAnnonce,
    sendComment
}

async function getAllAnnonces(req, res, next) {
    res.status(200).json({
        annonces: await Annonce.findAll()
    })
}

async function uploadFiles(req, res, next) {
    const form = new formidable.IncomingForm();
    const filepath = form.parse(req, function (err, fields, files) {
        console.log('FILES DATA', files);
        var oldpath = files.filetoupload[0].filepath;
        var newpath = UPLOAD_DIR + files.filetoupload[0].originalFilename;
        fs.copyFile(oldpath, newpath, function (err) {
            if (err) throw err;
        });
        return newpath;
    });
    return res.status(201).json({status: 'success', message: 'File uploaded and moved!', filepath });
}

async function createAnnonce(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
        const { title, description, price, filepath } = req.body;
        const annonce = await Annonce.create({
            title,
            description,
            price,
            filepath,
            user_id: req.user.id
        }, { transaction })

        transaction.commit();
        return res.status(201).json({
            status: "success",
            annonce
        })
    } catch(err) {
        transaction.rollback();
        console.log('ERROR', err);
        return res.status(400).json({
            status: "error",
            details: err.errors
        })
    }
}

async function sendComment(req, res, next) {
    const mailing = await mailer(
        'Soufian AIT TIRITE <s.aittirite@websociety.fr>',
        'bar@example.com',
        'Hello !',
        'TEST',
        '<h1>TEST</h1>'
    );
    if (mailing === true) {
        return res.json({ success: true });
    }
    return res.status(400).json({ success: false, error: mailing });
}
