class AppError extends Error {
  /**
   * @type { string }
   */
  static PREFIX = '❌';

  /**
   * @type { string }
   */
  name;

  /**
   *
   * @param { string } errorMessage
   */

  constructor(errorMessage) {
    const message = `${AppError.PREFIX} ${errorMessage}\n`;
    super(message);
    this.name = this.constructor.name;
  }
}

export default AppError;
