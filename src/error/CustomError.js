const PREFIX = {
  error: "[ERROR]",
};

class CustomError extends Error {
  constructor(message) {
    super(`${PREFIX.error} ${message}`);
  }
}

export default CustomError;
