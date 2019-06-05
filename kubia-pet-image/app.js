const express = require('express')
const app = express()
const os = require('os')
const fs = require('fs')
const dataFile = "/var/data/kubia.txt"


app.use(express.json())
app.use(express.urlencoded({urlencoded: true}))

console.log(`Kubia server starting...`)

app.get('/healths', (req, res) => {
    res.status(200).json({
        from: req.connection.remoteAddress,
        hostname: os.hostname()
    })
})

app.post('/', (req, res) => {
    try {
        var file = fs.createWriteStream(dataFile)
        file.on('open', (fd) => {
            req.pipe(file)
            console.log('New data has been received and stored.')
            res.status(200)
            res.end(`Data stored on po ${os.hostname()} \n`)
        })
    } catch (err) {
        res.status(500).json({
            erro: err.message
        })
    }
})

app.get('/', (req, res) => {

    try {
        var data = fs.existsSync(dataFile)
            ? fs.readFileSync(dataFile, 'utf8')   
            : 'No data posted yet'
        res.status(200)
        res.write(`You've hit ${os.hostname()} \n`)
        res.end(`Data stored on this pod: ${data} \n`)
    } catch (err) {
        res.status(500).json({
            erro: err.message
        })        
    }
})

app.listen(8080, () => {
    console.log(`Server is running in port 8080`)
})