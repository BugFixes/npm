/* global describe, it */
'use strict'

const BugFixes = require('../index')
const Functions = require('../functions')
const chai = require('chai')
const assert = chai.assert

describe('Test Info', () => {
  it('Info', (done) => {
    assert.isTrue(BugFixes.info('Info Test'), 'Info Worked')
    done()
  })
})

describe('Test Log', () => {
  it('Log', (done) => {
    assert.isTrue(BugFixes.log('Log Test'), 'Log Worked')
    done()
  })
})

describe('Test Error', () => {
  it('Error', (done) => {
    assert.isTrue(BugFixes.error('Error Test'), 'Error Worked')
    done()
  })
})

describe('Test Generic', () => {
  it('Generic', (done) => {
    const genericBug = new BugFixes({
      message: 'Generic Test',
      logLevel: BugFixes.LOG
    })

    assert.isObject(genericBug, 'Generic Worked')
    done()
  })
})

describe('Test Logger', () => {
  it('Logger', (done) => {
    assert.isTrue(Functions.Logger('Logger Test'), 'Logger Worked')
    done()
  })
})
