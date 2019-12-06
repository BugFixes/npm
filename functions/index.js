const uuid = require('uuid/v5');
const BugFixes = require('../index');

const BugFunctions = {
  checkIfDefined: (attribute) => {
    let returnState = true;

    // not defined
    if (typeof attribute === 'undefined') {
      returnState = null;
    }

    // already null, but make sure
    if (attribute === null) {
      returnState = null;
    }

    return returnState;
  },

  _returnObj: (code, message, type) => ({ code, message, type }),

  result: (code, message) => BugFunctions._returnObj(code, message, 'Success'),

  error: (code, message) => BugFunctions._returnObj(code, message, 'Error'),

  defaultError: (code) => BugFunctions.error(code, 'Unexpected Error'),

  createVerify: (name, email, id) => {
    const verifyString = JSON.stringify({ name, email });

    return uuid(verifyString, id);
  },

  lambdaResult: (code, message) => ({
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(BugFunctions.result(code, message)),
    isBase64Encoded: false,
  }),

  lambdaError: (code, message) => ({
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(BugFunctions.error(code, message)),
    isBase64Encoded: false,
  }),

  Logger: (error, req, res, next) => {
    if (BugFunctions.checkIfDefined(error.stack)) {
      BugFixes.error(error.stack);
    } else {
      BugFixes.error(error);
    }

    if (typeof next === 'function') {
      return next(error);
    }

    return true;
  },
};

module.exports = BugFunctions;
