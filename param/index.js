const Promise = require ('bluebird')

let shared = {}
module.exports = {
  get: () => Promise.resolve(shared),

  getByModule: (module) => {
    let results = []
    for (const key in params) {
      if (shared[key].module === module.id) {
        results.push(shared[key])
      }
    }
    return Promise.resolve(results)
  },

  getValues: names => Promise.resolve(names.map(name => shared[name])),

  getValue: name => new Promise((resolve, reject) => {
    if (shared[name]){
      resolve(shared[name])
    } else {
      reject(new Error(`Param ${name} not found`))
    }
  }),

  setValue: ({name, value}) => {
    shared[name] = value
    Promise.resolve({name: name, value: value})
  },

  delete: (name) => {
    if (shared[name]) {
      delete shared[name]
    } else {
      // FIXME not sure what happen if param is not set
    }
    return Promise.resolve()
  },

  clearCache: () => {
    shared.cache = {};
    return Promise.resolve();
  }
}
