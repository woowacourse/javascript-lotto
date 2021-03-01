class ValidationError extends Error {
  constructor(message) {
    super(message);
    this._message = message;
  }

  get message() {
    return this._message;
  }
}

export default ValidationError;
