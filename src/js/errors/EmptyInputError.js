export default class EmptyInputError extends TypeError {
  constructor(message) {
    super(message);
    this.message = message;
  }
}
