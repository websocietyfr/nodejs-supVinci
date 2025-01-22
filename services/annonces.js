const { mailer } = require('./mailer')
const { Annonce, sequelize } = require('../models')
const formidable = require('formidable');
const fs = require('fs');


module.exports = {
    getAllAnnonces,
    uploadFiles,
    createAnnonce,
    sendComment,
    getFile
}

async function getAllAnnonces(req, res, next) {
    res.status(200).json({
        annonces: await Annonce.findAll()
    })
}

async function uploadFiles(req, res, next) {
    try {
        const form = new formidable.IncomingForm();
        const filepath = await form.parse(req, function (err, fields, files) {
            if (err) throw err;
            const oldpath = files.filetoupload[0].filepath;
            const filename = Date.now().toString() + '-' +  files.filetoupload[0].originalFilename;
            const newpath = UPLOAD_DIR + filename;
            fs.copyFile(oldpath, newpath, function (err) {
                if (err) throw err;
                res.status(201).json({
                    status: 'success',
                    message: 'File uploaded and moved!',
                    filepath: filename
                });
                res.end();
            });
        });
        return filepath;
    } catch(e) {
        console.log('ERROR', e);
        return res.status(400).json({status: 'error', error: e.message});
    }
}

async function getFile(req, res, next) {
    if(fs.existsSync(UPLOAD_DIR + req.params.path)) {
        const readStream = fs.createReadStream(UPLOAD_DIR + req.params.path)
        readStream.pipe(res)
    } else {
        return res.status(400).json({status: 'error', message: 'no file found'});
    }
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
