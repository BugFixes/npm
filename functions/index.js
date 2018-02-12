'use strict'

function checkIfDefined (attribute) {
  let returnState = true

    // not defined
  if (typeof attribute === 'undefined') {
    returnState = null
  }

    // already null, but make sure
  if (attribute === null) {
    returnState = null
  }

  return returnState
}

function result (code, message) {
  return {
    code: code,
    message: message,
    type: 'Success'
  }
}

function error (code, message) {
  return {
    code: code,
    message: message,
    type: 'Error'
  }
}

function defaultError (code) {
  return error(code, 'Unexpected Error')
}

function createVerify (name, email, id) {
  const uuid = require('uuid/v5')

  const verifyObj = {
    name: name,
    email: email
  }
  const verifyString = JSON.stringify(verifyObj)

  return uuid(verifyString, id)
}

function Logger (error, req, res, next) {
  const BugFixes = require('./index')

  if (checkIfDefined(error.stack)) {
    BugFixes.error(error.stack)
  } else {
    BugFixes.error(error)
  }

  if (typeof next === 'function') {
    return next(error)
  }

  return true
}

module.exports = {
  checkIfDefined: checkIfDefined,
  error: error,
  defaultError: defaultError,
  createVerify: createVerify,
  result: result,
  Logger: Logger
}
