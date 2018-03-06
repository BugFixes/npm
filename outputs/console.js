/* global context */
const functions = require('../functions')

class Console {
  constructor () {
    // Console or context
    if (functions.checkIfDefined(console)) {
      this.console = console
    } else if (functions.checkIfDefined(context)) {
      this.console = context
    }
  }

  // Set the Icon
  setIcon (icon) {
    this.icon = icon

    return this
  }

  // Set the Payload
  setPayload (payLoad) {
    this.payLoad = payLoad

    return this
  }

  log () {
    this.setIcon('\u2111')
    this.console.log(this.icon, this.payLoad)

    return this
  }

  error () {
    this.setIcon('\u2206')
    this.console.error(this.icon, this.payLoad)

    return this
  }

  info () {
    this.setIcon('\u203c')
    this.console.info(this.icon, this.payLoad)

    return this
  }
}

module.exports = Console
