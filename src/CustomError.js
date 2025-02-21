class CustomError extends Error {
  constructor(message, prefix) {
    super(`${prefix} ${message}`);
  }
}

export default CustomError;
