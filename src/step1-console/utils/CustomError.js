export default class CustomError extends Error {
  constructor(message) {
    const formatMessage = () => `[ERROR] ${message}`;

    super(formatMessage(message));
  }
}
