const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

//Get users by ID
router.get('/:id', (req, res) => {
    const userId = req.params.id
    const sql = 'SELECT username, active, url_profile_img FROM users WHERE users.id=?'
    mysql.query(sql, userId, (err, result) => {
        if (err) {
            res.status(500).send('Error' + err)
        } else {
            res.status(200).json(result)
        }
    })
})

module.exports = router