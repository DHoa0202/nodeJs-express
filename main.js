const express = require('express')
const app = express()
const port = 8080;

app.get('/', function (req, res) {
  res.send('<h1>Xin chào<h1>')
})

app.listen(port, () => console.log(`Application start on server with port: ${port}`));
