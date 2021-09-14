var express = require('express')


module.exports = function ({ businessLogicDatabase }) {

    const router = express.Router()

    router.get('/', function (req, res) {
        res.send('Chargers');
    })

    router.get('/:id', function (req, res) {
        res.send(req.params.id)
    })

    router.get('/available', function (req, res) {
        res.send('return all available chargers');
    })

    router.post('/', function (req, res) {
        res.send("add charger")
    })

    router.delete('/:id', function (req, res) {
        res.send("delete charger")
    })

    router.put('/:id', function (req, res) {
        res.send("update charger with id")
    })


    return router
}