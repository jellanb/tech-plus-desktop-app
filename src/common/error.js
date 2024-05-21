

const ErrorType = {
    SqliteException: 'SQLITE_EXCEPTION',
    InputValidationError: 'INPUT_VALIDATION_ERROR'
};

function newError(dataError, typeError, msgError) {
    console.log(`Error type: ${typeError} message: ${msgError}, error data: ${dataError}`);
    return {
        error: new Error(dataError),
        type: typeError,
        msg: msgError,
    };
};

module.exports = {
    newError,
    ErrorType
};