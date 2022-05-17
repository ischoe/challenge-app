const express = require('express')
const app = express()
const port = 3001
const data = require('./demo.json')

app.listen(port, () => console.log(`Listening on port ${port}`))

app.get('/data', (req, res) => {
  res.send({ data: data })
})