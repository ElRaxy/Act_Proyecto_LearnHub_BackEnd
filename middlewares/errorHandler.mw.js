const logger = require("../utils/logger")

exports.errorHandler = (err,req,res,next) => {
    let { status = 500, message = "ERROR DEL SERVIDOR" } = err
    console.log("Dentro de Error Handler")
    console.log(err)
    console.log(err.name)
    console.log(err.code)

    if(err.name == "ValidationError"){
        status = 400
    }

    if(err.name == "MongoServerError"){
        status = 400
        if(err.code == 11000){
            //Duplicated Key
            status = 406 //Not Acceptable
        }
    }

    logger.error.error(`Error Handler(${status}): ${err}`)
    res.status(status).json({err:message})
}