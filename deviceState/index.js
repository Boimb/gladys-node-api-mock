const Promise = require ('bluebird')
let shared = []

module.exports = {
  create: (deviceState) => new Promise((resolve, reject) => {
    if(!deviceState.devicetype) {
      reject(new Error(`Failed to add deviceState. It should have at least an associated devicetype`))
    }
    if (deviceState.value === true || deviceState.value === 'true') {
      deviceState.value = 1;
    } else if (deviceState.value === false || deviceState.value === 'false') {
      deviceState.value = 0;
    }
    const index = shared.push(deviceState)
    deviceState.id = index + 1
    resolve(deviceState)
  })
}