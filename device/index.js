const Promise = require('bluebird')
const deviceType = require('../deviceType')
const shared = {}
module.exports = {
  create: (param) => new Promise((resolve, reject) => {

    if (!param.device.identifier) {
      reject(new Error(`Pls provide identifier`))
    }

    if (shared[param.device.identifier]) {
      // update
      shared[param.device.identifier] = {...shared[param.device.identifier], ...param.device}
      resolve(shared[param.device.identifier])
    } else {
      // create
      shared[param.device.identifier] = param.device
      resolve(shared[param.device.identifier])
    }})
    .then(device => {
      // foreach deviceType, we create it if not exist
      return Promise.map(param.types, (type) => {
        type.device = device.id;
        return deviceType.create(type);
      })
      .then(deviceTypes => ({device: device, types: deviceTypes}))
    }),
  delete: device => new Promise((resolve, reject) => {
    if (!device.id) reject(new Error(`Pls provide id to delete device`))
    for (let key in shared){
      if (shared[key].id === device.id){
        resolve(key)

      }
    }
    reject(new Error(`Could not find any device with id ${device.id}`))
  })
  .then(key => {
    deviceType.deleteByDeviceId(device.id)
      .then(() => {
        delete shared[key]
        return
      })
  })
}
