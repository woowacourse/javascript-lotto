class EmptyInputError extends TypeError {
  constructor(message) {
    super(message);
    this._message = message;
  }

  get message() {
    return this._message;
  }
}

export default EmptyInputError;
