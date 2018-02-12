const http = require('http')
const jwt = require('jsonwebtoken')
const functions = require('./functions')

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

    // Console
    if (functions.checkIfDefined(console)) {
      this.console = console
    } else if (functions.checkIfDefined(context)) {
      this.console = context
    }

    // Log Levels
    if (this.logLevel === this.INFO) {
      this.info(this.message)
    } else if (this.logLevel === this.ERROR) {
      this.error(this.message)
    } else {
      this.log(this.message)
    }

        // Context
    if (functions.checkIfDefined(this.context)) {
      this.console = this.context
    }
  };

  parseParams (params) {
    this.message = params.message

    // LogLevel
    if (functions.checkIfDefined(params.logLevel)) {
      this.logLevel = params.logLevel
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
  };

  // Log
  log (message) {
    if (functions.checkIfDefined(this.API_KEY) && functions.checkIfDefined(this.API_SECRET)) {
      this.logHttp(message)
    }
    this.logConsole(message)
  };
  logConsole (message) {
    this.console.log('\u2211', message)
  };
  logHttp (message) {
    let messagePayLoad = jwt.sign(message, this.API_SECRET)
    this.sendMessage(messagePayLoad, this.LOG)
  };

  // Info
  info (message) {
    if (functions.checkIfDefined(this.API_KEY) && functions.checkIfDefined(this.API_SECRET)) {
      this.infoHttp(message)
    }
    this.infoConsole(message)
  };
  infoConsole (message) {
    this.console.info('\u203c', message)
  };
  infoHttp (message) {
    let messagePayLoad = jwt.sign(message, this.API_SECRET)
    this.sendMessage(messagePayLoad, this.INFO)
  };

  // Error
  error (message) {
    if (functions.checkIfDefined(this.API_KEY) && functions.checkIfDefined(this.API_SECRET)) {
      this.errorHttp(message)
    }
    this.errorConsole(message)
  }
  errorConsole (message) {
    this.console.error('\u2206', message)
  };
  errorHttp (message) {
    let messagePayLoad = jwt.sign(message, this.API_SECRET)
    this.sendMessage(messagePayLoad, this.ERROR)
  };

  // HTTP
  sendMessage (messagePayload, logLevel) {
    let payLoad = {
      message: messagePayload,
      logLevel: logLevel
    }
    payLoad = JSON.stringify(payLoad)

    const request = http.request({
      hostname: 'https://api.bugfix.es',
      port: '443',
      path: '/v1/bug',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payLoad),
        'X-API-KEY': this.API_KEY
      }
    })

    request.on('error', (error) => {
      console.log('BugFixes Error', error)
    })
    request.write(payLoad)
    request.end()
  }
};

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

  const bug = new BugFixes({
    message: message,
    logLevel: BugFixes.LOG
  })

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

  const bug = new BugFixes({
    message: message,
    logLevel: BugFixes.INFO
  })

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

  const bug = new BugFixes({
    message: message,
    logLevel: BugFixes.ERROR
  })

  return true
}

module.exports = BugFixes
