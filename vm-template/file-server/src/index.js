
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const crypto = require('crypto')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const port = 4040

app.post('/', (req, res) => {
  if(fs.existsSync(req.body.filepath)){
    // create a hash from the file
    const fileBuffer = fs.readFileSync(req.body.filepath)
    const hashSum = crypto.createHash('sha256')
    hashSum.update(fileBuffer)

    const hash = hashSum.digest('hex')
    res.send({hash: hash})
  }else{
    res.send({check: false, message: "File does not exists"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
