const express = require('express')
const app = express()
const os = require('os')
const fs = require('fs')
const dataFile = "/var/data/kubia.txt"
const dns = require('dns')
const serviceName = 'kubia.default.svc.cluster.local'
const port = 8080

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

app.get('/data', (req, res) => {

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

app.get('/*', (req, res) => {
    res.write(`You've hit ${os.hostname()} \n`)
    res.write(`Data stored in the cluster:\n`)
    dns.resolveSrv(serviceName, (err, addresses) => {
        if (err) {
            res.end(`Could not look up DNS SRV records: ${err}`)
            return;
        }
        var numResponses = 0
        if (addresses.length == 0) {
            res.end('No peers discovered.')
        } else {
            addresses.forEach(item => {
                var requestOptions = {
                    host: item.name,
                    port: port,
                    path: '/data'
                }
                
                httpGet(requestOptions, returnedData => {
                    numResponses++
                    res.write(`- ${item.name}: ${returnedData} \n`)
                    if (numResponse == addresses.length) {
                        Response.end()
                    }
                })
            })
        }
    })
})

app.listen(8080, () => {
    console.log(`Server is running in port 8080`)
})