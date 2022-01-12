const logger = require('../utils/loggers/logger')

function handler(options){
  return function(err,req,res,next){
    const errMeta = {
      query:req.query,
      path:req.originalUrl,
      userInfo:req.user,
    }
    logger.error(err.message,errMeta)
    // console.log('uncaught error in the middleware process',err)
  }
}
module.exports = handler
