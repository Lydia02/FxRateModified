import CustomAPIError from "./customError.js";

class UnauthorisedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

export default UnauthorisedError;
