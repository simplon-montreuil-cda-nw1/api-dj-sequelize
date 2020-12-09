const ValidationError = require("./400_validation");
const BadRequestError = require("./400_bad_request");
const UnauthorizedError = require("./401_unauthorized");
const ForbiddenError = require("./403_forbidden");
const NotFoundError = require("./404_not_found");

module.exports = {
  ValidationError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
