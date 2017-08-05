var express = require('express')
var app = express()
var getXeroData = require('./xero');
var cors = require('cors');
const PORT = 3002;

app.use(cors())

app.get('/items', function (req, res) {
  getXeroData().then((values) => {
    res.json(values)
  })
})

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`)
})