module.exports = function({ databaseInit }) {

    const exports = {}

    exports.getChargers = function(callback) {
        databaseInit.Chargers.findAll({ raw: true })
            .then(chargers => callback([], chargers))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })
    }

    exports.getCharger = function(chargerId, callback) {
        databaseInit.Chargers.findOne({ where: { chargerID: chargerId }, raw: true })
            .then(charger => callback([], charger))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })
    }

    exports.getChargerBySerialNumber = function(serialNumber, callback) {
        databaseInit.Chargers.findOne({ where: { serialNumber: serialNumber }, raw: true })
            .then(charger => callback([], charger))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })
    }

    exports.getAvailableChargers = function(callback) {
        databaseInit.Chargers.findAll({ where: { status: 1 }, raw: true })
            .then(chargers => callback([], chargers))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })
    }

    exports.addCharger = function(chargePointId, serialNumber, location, callback) {
        const charger = {
            chargePointID: chargePointId,
            serialNumber: serialNumber,
            location: location,
            status: 0
        }

        databaseInit.Chargers.create(charger)
            .then(charger => callback([], charger.chargerID))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })
    }

    exports.removeCharger = function(chargerId, callback) {
        databaseInit.Chargers.destroy({
                where: { chargerID: chargerId },
                raw: true
            })
            .then(numberDeletedOfChargers => {

                if (numberDeletedOfChargers == 0) {
                    callback([], false)
                } else {
                    callback([], true)
                }

            })
            .catch(e => {
                console.log(e)
                callback(e, false)
            })
    }

    exports.updateChargerStatus = function(chargerId, status, callback) {
        databaseInit.Chargers.update({
                status: status
            }, {
                where: { chargerID: chargerId },
                returning: true,
                raw: true
            })
            .then(charger => callback([], charger[1][0]))
            .catch(e => {
                console.log(e)
                callback(e, [])
            })
    }


    return exports
}