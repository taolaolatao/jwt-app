const router = require('express').Router()
const { authToken } = require('../middle/auth')

router.post('/', authToken, (req, res) => {
    res.json({
        title: 'This is the title',
        name: 'DNTM 10-02-2001',
        user: req.user
    })
})

module.exports = router