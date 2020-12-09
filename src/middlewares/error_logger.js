/* eslint-disable no-console */
module.exports = (error, request, response, next) => {
  const { status, name, description, stack } = error;

  console.error(`${name}\n  ${description || "Server Error"}`);
  if (!status) {
    console.error(stack);
  }

  next(error);
};
