const http = require('http')
const jwt = require('jsonwebtoken')
const functions = require('./functions')
const Console = require('./outputs/console')
const Network = require('./outputs/network')

class BugFixes {
  constructor (params, logLevel = null) {
    if (typeof params === 'object') {
      this.parseParams(params)
    } else {
      this.message = params
      this.logLevel = logLevel
    }

    // Log Level defenitions
    this.LOG = 1
    this.INFO = 2
    this.ERROR = 3

    // API
    if (!functions.checkIfDefined(this.API_KEY)) {
      if (functions.checkIfDefined(process.env.BUGFIXES_KEY)) {
        this.API_KEY = process.env.BUGFIXES_KEY
      }
    }
    if (!functions.checkIfDefined(this.API_SECRET)) {
      if (functions.checkIfDefined(process.env.BUGFIXES_SECRET)) {
        this.API_SECRET = process.env.BUGFIXES_SECRET
      }
    }

    // Log Levels
    if (this.logLevel === this.INFO) {
      this.info(this.message)
    } else if (this.logLevel === this.ERROR) {
      this.error(this.message)
    } else {
      if (functions.checkIfDefined(this.message)) {
        this.log(this.message)
      }
    }

        // Context
    if (functions.checkIfDefined(this.context)) {
      this.console = this.context
    }
  }

  setLogLevel(logLevel) {
    this.logLevel = logLevel

    return this
  }

  setMessage(message) {
    this.message = message

    return this
  }

  parseParams (params) {
    this.setMessage(params.message)

    // LogLevel
    if (functions.checkIfDefined(params.logLevel)) {
      this.setLogLevel(params.logLevel)
    }

    // Context
    if (functions.checkIfDefined(params.context)) {
      this.context = params.context
    }

    // API_KEY
    if (functions.checkIfDefined(params.key)) {
      this.API_KEY = params.key
    }
    if (functions.checkIfDefined(params.API_KEY)) {
      this.API_KEY = params.API_KEY
    }

    // API_SECRET
    if (functions.checkIfDefined(params.secret)) {
      this.API_SECRET = params.secret
    }
    if (functions.checkIfDefined(params.API_SECRET)) {
      this.API_SECRET = params.API_SECRET
    }
  }

  // Log
  log (message) {
    this.message = message
    if (functions.checkIfDefined(this.API_KEY) && functions.checkIfDefined(this.API_SECRET)) {
      this.logHttp()
    }
    this.logConsole()
  }
  logConsole (message) {
    const bugConsole = new Console()
    bugConsole
      .setPayload(this.message)
      .log()
  }
  logHttp (message) {
    const bugNetwork = new Network()
    bugNetwork.setKey(this.API_KEY)
      .setSecret(this.API_SECRET)
      .setPayload(this.message)
      .setLogLevel(BugFixes.LOG)
      .sendMessage()
  }

  // Info
  info (message) {
    this.message = message
    if (functions.checkIfDefined(this.API_KEY) && functions.checkIfDefined(this.API_SECRET)) {
      this.infoHttp()
    }
    this.infoConsole()
  }
  infoConsole () {
    const bugConsole = new Console()
    bugConsole
      .setPayload(this.message)
      .info()
  }
  infoHttp () {
    const bugNetwork = new Network()
    bugNetwork.setKey(this.API_KEY)
      .setSecret(this.API_SECRET)
      .setPayload(this.message)
      .setLogLevel(BugFixes.INFO)
      .sendMessage()
  }

  // Error
  error (message) {
    this.message = message
    if (functions.checkIfDefined(this.API_KEY) && functions.checkIfDefined(this.API_SECRET)) {
      this.errorHttp()
    }
    this.errorConsole()
  }
  errorConsole () {
    const bugConsole = new Console()
    bugConsole
      .setPayload(this.message)
      .error()
  }
  errorHttp () {
    const bugNetwork = new Network()
    bugNetwork.setKey(this.API_KEY)
      .setSecret(this.API_SECRET)
      .setPayload(this.message)
      .setLogLevel(BugFixes.ERROR)
      .sendMessage()
  }
}

BugFixes.LOG = 1
BugFixes.INFO = 2
BugFixes.ERROR = 3

// Function remap
BugFixes.log = function (message) {
  if (arguments.length >= 2) {
    let finalMessage = ''

    for (let i = 0; i < arguments.length; i++) {
      finalMessage += arguments[i]
      finalMessage += ', '
    }
    message = finalMessage.substring(0, finalMessage.length - 2)
  }

  const bug = new BugFixes()
  bug.log(message)

  return true
}
BugFixes.info = function (message) {
  if (arguments.length >= 2) {
    let finalMessage = ''

    for (let i = 0; i < arguments.length; i++) {
      finalMessage += arguments[i]
      finalMessage += ', '
    }
    message = finalMessage.substring(0, finalMessage.length - 2)
  }

  const bug = new BugFixes()
  bug.info(message)

  return true
}
BugFixes.error = function (message) {
  if (arguments.length >= 2) {
    let finalMessage = ''

    for (let i = 0; i < arguments.length; i++) {
      finalMessage += arguments[i]
      finalMessage += ', '
    }
    message = finalMessage.substring(0, finalMessage.length - 2)
  }

  let bug = new BugFixes()
  bug.error(message)

  return true
}

module.exports = BugFixes
