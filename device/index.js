const Promise = require('bluebird')
const deviceType = require('../deviceType')
let shared = []
module.exports = {
  create: (param) => new Promise((resolve, reject) => {

    if (!param.device.identifier) {
      reject(new Error(`Pls provide identifier`))
    }
    let device = shared.find(d => d.identifier === param.device.identifier)
    if (device !== null) {
      // update
      let device = {...device, ...param.device}
      resolve(device)
    } else {
      // create
      const index = shared.push(param.device)
      shared[index].id = index + 1
      resolve(shared[index])
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
    let toDelete = shared.find(d => d.id === device.id)
    if (!toDelete) {
      reject(new Error(`Could not find any device with id ${device.id}`))
    }
    toDelete = null;
    resolve(device.id)
  })
  .then(id => deviceType.deleteByDeviceId(id)),

  getByidentifier: ({identifier, service}) => {
    return Promise.resolve(shared.find(d => d.identifier === identifier && d.service === service))
  }
}
