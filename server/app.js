const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res) => {
  const filepath = path.join(__dirname, '..', 'dist', 'index.html');
  res.send(fs.readFileSync(filepath, 'utf-8'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

