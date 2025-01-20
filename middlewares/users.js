const { checkSchema } = require('express-validator')

async function validateUser(req, res, next) {
    console.log('user validation ...')

    const [ result ] = await checkSchema({
        nom: { notEmpty: true }
    }).run(req)

    if(!result.isEmpty()) {
        res.status(400).send('Pas de nom trouvé');
    }
    next();
}

module.exports = {
    validateUser
}