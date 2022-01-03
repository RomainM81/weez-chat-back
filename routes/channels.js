const express = require('express')
const mysql = require('../db-config')
const router = express.Router()

router.get('/', (req, res) => {
  const usersID = [req.query.id1, req.query.id2]
  mysql.query('SELECT * FROM channels WHERE id_user_1 = ? AND id_user_2 = ?',
  usersID), (err, result) => {
    if(err) {
      res.status(500).send('No channel found ' + err)
    } else {
      res.status(200).json(result)
    }
  }
})

router.post('/', (req, res) => {
  const usersID = [req.query.id1, req.query.id2]
  mysql.query('INSERT INTO channels (id_user_1, id_user_2) VALUES (?, ?)',
  usersID), (err, result) => {
    if(err) {
      res.status(500).send('No channel found ' + err)
    } else {
      res.status(200).json(result)
    }
  }
})

module.exports = router