export default class ValidationError extends Error {
  constructor(message, orderToView) {
    super(message);
    this.name = 'ValidationError';
    this.orderToView = orderToView;
  }
}
