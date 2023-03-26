const { validationResult } = require('express-validator')
const {handleHttpError} = require('./handleHttpError')

const validateResults = (req, res, next) => {
    try{
        validationResult(req).throw()
        return next()
    } catch(err){
        console.log(err)
        handleHttpError(res, 'VALIDATE_RESULTS_ERROR')
    }
}

module.exports = validateResults