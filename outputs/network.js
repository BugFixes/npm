const http = require('https')
const jwt = require('jsonwebtoken')

const Console = require('./console')

class Network {
  constructor () {
    this.path = '/v1/bug'
    this.address = 'https://api.bugfix.es'
  }

  setSecret (secret) {
    this.secret = secret

    return this
  }

  setKey (key) {
    this.key = key

    return this
  }

  setPayload (payLoad) {
    this.payLoad = payLoad

    return this.setMessagePayLoad()
  }

  setMessagePayLoad () {
    this.messagePayLoad = jwt.sign(this.payLoad, this.secret)

    return this
  }

  setLogLevel (logLevel) {
    this.logLevel = logLevel

    return this
  }

  sendMessage () {
    const self = this

    const promise = new Promise((resolve, reject) => {
      let payLoad = {
        message: self.messagePayLoad,
        logLevel: self.logLevel
      }
      payLoad = JSON.stringify(payLoad)

      const options = {
        hostname: self.address,
        path: self.path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payLoad),
          'X-API-KEY': self.key
        }
      }

      const request = http.request(options, (res) => {
        res.on('error', (error) => {
          reject(Error(error))
        })
      })
      request.end(payLoad, 'utf8', resolve(true))
    })

    promise.then((result) => {
      const cons = new Console()
      cons.setPayload('Worked')
      cons.log()
    }, (error) => {
      const cons = new Console()
      cons.setPayload(error)
        .error()
    })
  }
}

module.exports = Network
