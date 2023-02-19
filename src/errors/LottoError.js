import Messages from '../constant/Messages';

class LottoError extends Error {
  /**
   * @param {string} message
   * @param  {...any} args
   */
  constructor(message, ...args) {
    super(Messages.format(message, ...args));
    this.name = this.constructor.name;
  }
}

export default LottoError;
