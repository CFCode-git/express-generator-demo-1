const HTTPBaseError = require('./http_base_error');

const ERROR_CODE = 4040000;

class NotFoundError extends HTTPBaseError {
  constructor(resourceName, resourceId, httpMsg) {
    super(
      404,
      httpMsg,
      ERROR_CODE,
      `${resourceName} is not found, id:${resourceId}`,
    );
  }
}
module.exports = NotFoundError;
