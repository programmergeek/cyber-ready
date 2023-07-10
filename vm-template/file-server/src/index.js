
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const crypto = require('crypto')
const cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

const port = 4000

app.post('/', (req, res) => {
  if(fs.existsSync(req.body.filepath)){
    // create a hash from the file
    const fileBuffer = fs.readFileSync(req.body.filepath)
    const hashSum = crypto.createHash('sha256')
    hashSum.update(fileBuffer)
    const hash = hashSum.digest('hex')
    res.send({check:true, hash: hash})
  }else{
    res.send({check: false, message: "File does not exists"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
