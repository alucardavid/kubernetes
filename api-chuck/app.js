const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const apiChuckProxy = httpProxy('https://api.chucknorris.io')
const os = require('os')

app.use(express.json())
app.use(express.urlencoded({urlencoded: true}))

app.get('/', async (req, res) => {
    res.json({
        welcome: 'chucknorris.io is a free JSON API for hand curated Chuck Norris facts.',
        usage: {
            "1": {
                path: '/jokes/random',
                description: 'Retrieve a random chuck joke in JSON format.',
            },
            "2": {
                path: '/jokes/categories',
                description: 'Retrieve a list of available categories.'
            },
            "3": {
                path: '/jokes/random?category={category}',
                description: 'Retrieve a random chuck norris joke from a given category.'
            }

        }
    })
})

app.get('/jokes/random', async (req, res, next) => apiChuckProxy(req, res, next))

app.get('/jokes/categories', async (req, res, next) => apiChuckProxy(req, res, next))

app.get('/jokes/random?category=(*)', async (req, res, next) => apiChuckProxy('', req, res, next))

app.get('/healthz', (req, res, next) => {
    res.status(200).json({
        statusCode: 200,
        msg: "It's fine"
    })
})

app.get('/host-info', (req, res, next) => res.json({host: os.hostname(), network: os.networkInterfaces()}))

app.listen(3000, () => console.log('Server listening in port 3000.'))
