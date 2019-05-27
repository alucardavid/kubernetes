const fs = require('fs')

function list(){
    try {
        let content = fs.readFileSync('./data/customers.json')
        let jsonContent = JSON.parse(content)
        return jsonContent
    } catch (err) {
        return {msg: err}
    }
}

module.exports = { list }