const functions = require('./functions');
const Console = require('./outputs/console');
const Network = require('./outputs/network');

class BugFixes {
  constructor(params, logLevel = null) {
    if (typeof params === 'object') {
      this.parseParams(params);
    } else {
      this.message = params;
      this.logLevel = logLevel;
    }

    // Log Level defenitions
    this.LOG = 1;
    this.INFO = 2;
    this.ERROR = 3;

    // API
    if (!functions.checkIfDefined(this.API_KEY)) {
      if (functions.checkIfDefined(process.env.BUGFIXES_KEY)) {
        this.apiKey = process.env.BUGFIXES_KEY;
      }
    }
    if (!functions.checkIfDefined(this.API_SECRET)) {
      if (functions.checkIfDefined(process.env.BUGFIXES_SECRET)) {
        this.apiSecret = process.env.BUGFIXES_SECRET;
      }
    }
    if (!functions.checkIfDefined(this.API_ID)) {
      if (functions.checkIfDefined(process.env.BUGFIXES_ID)) {
        this.apiId = process.env.BUGFIXES_ID;
      }
    }
    if (!functions.checkIfDefined(this.ICON_SKIP)) {
      if (functions.checkIfDefined(process.env.BUGFIXES_ICON_SKIP)) {
        this.iconSkip = process.env.BUGFIXES_ICON_SKIP;
      }
    }

    // Log Levels
    if (this.logLevel === this.INFO) {
      this.info(this.message);
    } else if (this.logLevel === this.ERROR) {
      this.error(this.message);
    }

    if (functions.checkIfDefined(this.message)) {
      this.log(this.message);
    }

    // Context
    if (functions.checkIfDefined(this.context)) {
      this.console = this.context;
    }
  }

  set loglevel(loglevel) {
    this._loglevel = loglevel;
  }

  get loglevel() {
    return this._loglevel;
  }

  set message(message) {
    this._message = message;
  }

  get message() {
    return this._message;
  }

  set apiId(apiId) {
    this._apiId = apiId;
  }

  get apiId() {
    return this._apiId;
  }

  set apiSecret(apiSecret) {
    this._apiSecret = apiSecret;
  }

  get apiSecret() {
    return this._apiSecret;
  }

  set apiKey(apiKey) {
    this._apiKey = apiKey;
  }

  get apiKey() {
    return this._apiKey;
  }

  set iconSkip(skip) {
    this._iconSkip = skip;
  }

  get iconSkip() {
    return this._iconSkip;
  }

  parseParams(params) {
    this.message = params.message;

    // LogLevel
    if (functions.checkIfDefined(params.logLevel)) {
      this.logLevel = params.logLevel;
    }

    // Context
    if (functions.checkIfDefined(params.context)) {
      this.context = params.context;
    }

    // API_KEY
    if (functions.checkIfDefined(params.key)) {
      this.apiKey = params.key;
    }
    if (functions.checkIfDefined(params.API_KEY)) {
      this.apiKey = params.API_KEY;
    }

    // API_SECRET
    if (functions.checkIfDefined(params.secret)) {
      this.apiSecret = params.secret;
    }
    if (functions.checkIfDefined(params.API_SECRET)) {
      this.apiSecret = params.API_SECRET;
    }

    // API_ID
    if (functions.checkIfDefined(params.id)) {
      this.apiId = params.id;
    }
    if (functions.checkIfDefined(params.API_ID)) {
      this.apiId = params.API_ID;
    }

    // ICON_SKIP
    if (functions.checkIfDefined(params.iconSkip)) {
      this.iconSkip = params.iconSkip;
    }
    if (functions.checkIfDefined(params.ICON_SKIP)) {
      this.iconSkip = params.ICON_SKIP;
    }
  }

  // Log
  log(message) {
    this.message = message;
    if (functions.checkIfDefined(this.apiKey)
    && functions.checkIfDefined(this.apiSecret)
    && functions.checkIfDefined(this.apiId)) {
      this.logHttp();
    }
    this.logConsole();
  }

  logConsole() {
    const bugConsole = new Console();
    bugConsole.payload = this.message;
    bugConsole.iconSkip = this.iconSkip;
    bugConsole.log();
  }

  logHttp() {
    const bugNetwork = new Network();
    bugNetwork.key = this.apiKey;
    bugNetwork.secret = this.apiSecret;
    bugNetwork.id = this.apiId;
    bugNetwork.payload = this.message;
    bugNetwork.loglevel = BugFixes.LOG;
    bugNetwork.sendMessage();
  }

  // Info
  info(message) {
    this.message = message;
    if (functions.checkIfDefined(this.apiKey)
    && functions.checkIfDefined(this.apiSecret)
    && functions.checkIfDefined(this.apiId)) {
      this.infoHttp();
    }
    this.infoConsole();
  }

  infoConsole() {
    const bugConsole = new Console();
    bugConsole.payload = this.message;
    bugConsole.iconSkip = this.iconSkip;
    bugConsole.info();
  }

  infoHttp() {
    const bugNetwork = new Network();
    bugNetwork.key = this.apiKey;
    bugNetwork.secret = this.apiSecret;
    bugNetwork.id = this.apiId;
    bugNetwork.payload = this.message;
    bugNetwork.loglevel = BugFixes.INFO;
    bugNetwork.sendMessage();
  }

  // Error
  error(message) {
    this.message = message;
    if (functions.checkIfDefined(this.apiKey)
    && functions.checkIfDefined(this.apiSecret)
    && functions.checkIfDefined(this.apiId)) {
      this.errorHttp();
    }
    this.errorConsole();
  }

  errorConsole() {
    const bugConsole = new Console();
    bugConsole.payload = this.message;
    bugConsole.iconSkip = this.iconSkip;
    bugConsole.error();
  }

  errorHttp() {
    const bugNetwork = new Network();
    bugNetwork.key = this.apiKey;
    bugNetwork.secret = this.apiSecret;
    bugNetwork.id = this.apiId;
    bugNetwork.loglevel = BugFixes.ERROR;
    bugNetwork.payload = this.message;
    bugNetwork.sendMessage();
  }
}

BugFixes.LOG = 1;
BugFixes.INFO = 2;
BugFixes.ERROR = 3;

// Function remap
BugFixes.log = (...message) => {
  let finalMessage = '';
  if (message.length >= 2) {
    for (let i = 0; i < message.length; i += 1) {
      if (typeof message[i] === 'object') {
        finalMessage += JSON.stringify(message[i]);
      } else {
        finalMessage += message[i];
      }

      finalMessage += ', ';
    }
    finalMessage = finalMessage.substring(0, finalMessage.length - 2);
  }

  const bug = new BugFixes();
  bug.log(finalMessage);

  return true;
};
BugFixes.info = (...message) => {
  let finalMessage = '';
  if (message.length >= 2) {
    for (let i = 0; i < message.length; i += 1) {
      if (typeof message[i] === 'object') {
        finalMessage += JSON.stringify(message[i]);
      } else {
        finalMessage += message[i];
      }

      finalMessage += ', ';
    }
    finalMessage = finalMessage.substring(0, finalMessage.length - 2);
  }

  const bug = new BugFixes();
  bug.info(finalMessage);

  return true;
};
BugFixes.error = (...message) => {
  let finalMessage = '';
  if (message.length >= 2) {
    for (let i = 0; i < message.length; i += 1) {
      if (typeof message[i] === 'object') {
        finalMessage += JSON.stringify(message[i]);
      } else {
        finalMessage += message[i];
      }

      finalMessage += ', ';
    }
    finalMessage = finalMessage.substring(0, finalMessage.length - 2);
  }

  const bug = new BugFixes();
  bug.error(finalMessage);

  return true;
};

// Functions
BugFixes.functions = functions;

module.exports = BugFixes;
