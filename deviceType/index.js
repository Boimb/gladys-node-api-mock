const Promise = require ('bluebird')
let shared = []

module.exports = {
  create: (deviceType) => new Promise((resolve, reject) => {
    if(!deviceType.device) {
      reject(new Error(`Failed to add deviceType. It should have at least an associated device`))
    }
    const index = shared.push(deviceType)
    deviceType.id = index + 1
    resolve(deviceType)
  }),
  deleteByDeviceId: deviceId => {
    let toDelete = shared.filter(dt => dt.device === deviceId)
    if (toDelete.length < 1) {
      Promise.reject(new Error(`No DeviceType associated with deviceId = ${deviceId}`))
    }
    shared = shared.map(dt => toDelete.find(td => td.id === dt.id) !== null ? null : dt)
  }
}