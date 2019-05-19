const express = require('express')
const app = express()
const os = require('os')
var countReq = 0

app.use(express.json())
app.use(express.urlencoded({urlencoded: true}))

console.log(`Kubia server starting...`)

app.get('/*', (req, res, next) => {
    console.log(`Received request from ${req.connection.remoteAddress}`)
    countReq++
    if (countReq > 5 ) {
        res.status(400)
        res.end(`Requisitions above the limit`)
    }
    else {
        res.status(200)
        res.end(`You've hit ${os.hostname()} \n Req count: ${countReq}\n`)
    }
})

app.listen(8080, () => {
    console.log(`Server is running in port 8080`)
})