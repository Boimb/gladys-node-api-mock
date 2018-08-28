#[WIP] Gladys-node-api-mock

Simply mocks the Gladys API.
See [Gladys project](https://github.com/GladysProject/Gladys)

Usefull to test your modules outside of Gladys

##Installation

    npm install git+https://git@github.com/Boimb/gladys-node-api-mock.git --save-dev

##Usage

You'll need [mocha](https://mochajs.org/) and [sinon](https://sinonjs.org/) too.

    npm install mocha sinon --save-dev
    
Then in your tests : 

````javascript
// Imports
const gladysMock = require('gladys-node-api-mock')
// Need sinon
const sinon = require ('sinon')

// init gladys global variable before the test
before(() => {
  gladys = gladysMock
  // Be carefull, you surely have to mock sails too...
  // but that's not the concern of this package :p

});

// Write your tests
describe('My Test', () => {
  it('Should resolve with a value', () => {
  
    // Here, myFuncDependingOnGladys, uses gladys.param.getValue()
    const fake = sinon.fake.returns(Promise.resolve('attended value'))
    sinon.replace(gladys.param, 'getValue', fake)
  
    return myFuncDependingOnGladys()
      .then(result => {
      // Your assertions...
      })
  })
})
//If you need to "reset" the mock state.
after(() => {
  sinon.restore()
})
````

## TODO

- Implement more properties
- Add kinda fixtures
