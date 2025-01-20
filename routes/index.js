const userRoutes = require('./users')
const authenticateRoutes = require('./authenticate')
const annonceRoutes = require('./annonces')
const { validateAuthentication } = require('../middlewares/authorization')

function initRoutes(app) {
    app.use('/api/', authenticateRoutes)
    app.use(validateAuthentication) // toutes les routes qui viennent ensuite sont protégées
    app.use('/api/users', userRoutes)
    app.use('/api/annonces', annonceRoutes)
}

module.exports = initRoutes