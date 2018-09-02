const Promise = require ('bluebird')
const shared = {}

module.exports = {
  create: (deviceType) => new Promise((resolve, reject) => {
    if(!deviceType.device) {
      reject(new Error(`Failed to add deviceType. It should have at least an associated device`))
    }

    if (!shared[device.id]) shared[device.id] = []
    shared[device.id].push(deviceType)
    resolve(deviceType)
  }),
  deleteByDeviceId: deviceId => {
    delete shared[deviceId]
  }
}