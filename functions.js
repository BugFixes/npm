'use strict';

const uuid = require('uuid/v5');

function checkIfDefined(attribute) {
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
}

function result(code, message) {
    return {
        code: code,
        message: message,
        type: "Success"
    };
}

function error(code, message) {
    return {
        code: code,
        message: message,
        type: 'Error'
    };
}

function defaultError(code) {
    return error(code, 'Unexpected Error');
}

function createVerify(name, email, id) {
    const verifyObj = {
        name: name,
        email: email
    };
    const verifyString = JSON.stringify(verifyObj);

    return uuid(verifyString, id);
}

module.exports = {
    checkIfDefined: checkIfDefined,
    error: error,
    defaultError: defaultError,
    createVerify: createVerify,
    result: result
};
