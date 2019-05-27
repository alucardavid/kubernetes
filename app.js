const express = require('express')
const app = express()
const os = require('os')
const customersDao = require('./dao/customers-dao.js')
var countReq = 0

app.use(express.json())
app.use(express.urlencoded({urlencoded: true}))

console.log(`Kubia server starting...`)

app.get('/healths', (req, res) => {
    res.status(200).json({
        from: req.connection.remoteAddress,
        hostname: os.hostname()
    })

    // console.log(`Received request from ${req.connection.remoteAddress}`)
    // res.status(200)
    // res.end(`You've hit ${os.hostname()} \n Req count: ${countReq}\n`)
})

app.get('/customers', (req, res) => {
    res.status(200).json(customersDao.list())
    res.end()
})

app.get('/', (req, res) => {
    res.status(200).json({
        main: 'Welcome to api sample.',
        uris: [{
            uri: '/healths',
            description: 'Check microservice status',
            methods: ['GET']
        }, {
            uri: '/customers',
            description: 'List all clients',
            methods: ['GET', 'POST']
        }]
    })
    
    res.end()
})

app.listen(8080, () => {
    console.log(`Server is running in port 8080`)
})