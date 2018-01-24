const http = require('http');
const jwt = require('jsonwebtoken');

class BugFixes {
    constructor(params, logLevel = null) {
        if (typeof params === "object") {
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
        if (!this.checkIfDefined(this.API_KEY)) {
            if (this.checkIfDefined(process.env.BUGFIXES_KEY)) {
                this.API_KEY = process.env.BUGFIXES_KEY;
            }
        }
        if (!this.checkIfDefined(this.API_SECRET)) {
            if (this.checkIfDefined(process.env.BUGFIXES_SECRET)) {
                this.API_SECRET = process.env.BUGFIXES_SECRET;
            }
        }

        // Console
        this.console = console;

        // Log Levels
        if (this.logLevel === this.INFO) {
            this.info(this.message);
        } else if (this.logLevel === this.ERROR) {
            this.error(this.message);
        } else {
            this.log(this.message);
        }

        // Context
        if (this.checkIfDefined(this.context)) {
            this.console = this.context;
        }
    };

    parseParams(params) {
        this.message = params.message;

        // LogLevel
        if (this.checkIfDefined(params.logLevel)) {
            this.logLevel = params.logLevel
        }

        // Context
        if (this.checkIfDefined(params.context)) {
            this.context = params.context;
        }

        // API_KEY
        if (this.checkIfDefined(params.key)) {
            this.API_KEY = params.key;
        }
        if (this.checkIfDefined(params.API_KEY)) {
            this.API_KEY = params.API_KEY;
        }

        // API_SECRET
        if (this.checkIfDefined(params.secret)) {
            this.API_SECRET = params.secret;
        }
        if (this.checkIfDefined(params.API_SECRET)) {
            this.API_SECRET = params.API_SECRET;
        }
    };

    // Check if defined
    checkIfDefined(attribute) {
        let returnState = true;

        // not defined
        if (typeof attribute === "undefined") {
            returnState = null;
        }

        // already null, but make sure
        if (attribute === null) {
            returnState = null;
        }

        return returnState;
    };

    // Log
    log(message) {
        if (this.checkIfDefined(this.API_KEY) && this.checkIfDefined(this.API_SECRET)) {
            this.log_http(message);
        }
        this.log_console(message);
    };
    log_console(message) {
        this.console.log(message);
    };
    log_http(message) {
        let payload = jwt.sign({
            message: message,
            logLevel: this.LOG
        }, this.API_SECRET);
        this.sendMessage(payload);
    };

    // Info
    info(message) {
        if (this.checkIfDefined(this.API_KEY) && this.checkIfDefined(this.API_SECRET)) {
            this.info_http(message);
        }
        this.info_console(message);
    };
    info_console(message) {
        this.console.info(message);
    };
    info_http(message) {
        let payload = jwt.sign({
            message: message,
            logLevel: this.INFO
        }, this.API_SECRET);
        this.sendMessage(payload);
    };

    // Error
    error(message) {
        if (this.checkIfDefined(this.API_KEY) && this.checkIfDefined(this.API_SECRET)) {
            this.error_http(message);
        }
        this.error_console(message);
    }
    error_console(message) {
        this.console.error(message);
    };
    error_http(message) {
        let payload = jwt.sign({
            message: message,
            logLevel: this.ERROR
        }, this.API_SECRET);
        this.sendMessage(payload);
    };

    // HTTP
    sendMessage(payload) {
        const request = http.request({
            hostname: "https://api.bugfix.es",
            port: "443",
            path: "/v1/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(payload),
                "api_key": this.API_KEY
            }
        });

        request.on('error', (error) => {
            console.log("BugFixes Error", error);
        });
        request.write(payload);
        request.end();
    }
};

BugFixes.LOG = 1;
BugFixes.INFO = 2;
BugFixes.ERROR = 3;

// Function remap
BugFixes.log = function(message) {
    if (arguments.length >= 2) {
        finalMessage = "";

        for (let i = 0; i < arguments.length; i++) {
            finalMessage += arguments[i];
            finalMessage += ", "
        }
        message = finalMessage.substring(0, finalMessage.length - 2);
    }

    new BugFixes({
        message: message,
        logLevel: BugFixes.LOG
    });
};
BugFixes.info = function(message) {
    if (arguments.length >= 2) {
        finalMessage = "";

        for (let i = 0; i < arguments.length; i++) {
            finalMessage += arguments[i];
            finalMessage += ", "
        }
        message = finalMessage.substring(0, finalMessage.length - 2);
    }

    new BugFixes({
        message: message,
        logLevel: BugFixes.INFO
    });
};
BugFixes.error = function(message) {
    if (arguments.length >= 2) {
        finalMessage = "";

        for (let i = 0; i < arguments.length; i++) {
            finalMessage += arguments[i];
            finalMessage += ", "
        }
        message = finalMessage.substring(0, finalMessage.length - 2);
    }

    new BugFixes({
        message: message,
        logLevel: BugFixes.ERROR
    });
};

module.exports = BugFixes;
