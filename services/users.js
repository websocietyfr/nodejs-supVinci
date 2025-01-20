const { User } = require('../models')

module.exports = {
    getAllUsers,
    getCurrentUser
}

async function getAllUsers(req, res, next) {
    res.status(200).json({
        users: await User.findAll()
    })
}

async function getCurrentUser(req, res, next) {
    res.status(200).json({
        user: req.user
    })
}
