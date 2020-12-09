const { BAD_REQUEST } = require("../status_codes");

module.exports = class BadRequestError extends Error {
  constructor(message, description, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }

    this.name = `BadRequestError`;
    this.status = BAD_REQUEST;
    this.message = message;
    this.description = description;
  }
};
