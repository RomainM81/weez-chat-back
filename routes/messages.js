const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

router.get('/:channel', (req, res) => {
  const sqlValue = [req.params.channel]
  mysql.query('SELECT * FROM messages WHERE channels_id = ? ORDER BY date_posted ASC',
  sqlValue, (err, result) => {
    if(err) {
      res.status(500).send('Error retrieving messages' + err)
    } else {
      res.status(200).json(result)
    }
  })
});

router.post('/newMessage/', (req, res) => {
  const sqlValue = [req.params.text, req.params.channels_id, req.params.users_id]
  mysql.query('INSERT INTO messages (text, date_posted, channels_id, users_id) VALUES (?, NOW(), ?, ?)',
  sqlValue, (err, result) => {
    if(err) {
      res.status(500).send('Error Posting message' + err)
    } else {
      res.status(200).json(result)
    }
  })
});

module.exports = router