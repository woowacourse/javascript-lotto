import RestartCommand from '../../constant/RestartCommand';
import WinningLotto from '../../domain/WinningLotto';
import LottoError from '../../errors/LottoError';
import { LtMoneyInput, LtWinningLottoInput } from './component';

const InputView = {
  /**
   * @returns {Promise<number>}
   */
  async readMoney() {
    /** @type {LtMoneyInput} */
    const $money = document.getElementById('money');

    const money = $money.value;
    if (money === null) throw new LottoError('로또 번호를 입력해주세요!');

    return money;
  },

  /**
   * @returns {Promise<WinningLotto>}
   */
  async readWinningLotto() {
    /** @type {LtWinningLottoInput} */
    const $winningLotto = document.getElementById('winning-lotto');

    const winningLotto = $winningLotto.value;
    if (!(winningLotto instanceof WinningLotto)) throw new LottoError('당첨 번호를 입력해주세요!');

    return winningLotto;
  },

  /**
   *
   * @returns {Promise<string>}
   */
  async readRestartCommand() {
    /** @type {HTMLFormElement} */
    const $lottoForm = document.getElementById('lotto-form');

    $lottoForm.reset();
    InputView.resetAnchor();
    return RestartCommand.YES;
  },

  resetAnchor() {
    /** @type {HTMLFormElement} */
    const $lottoForm = document.getElementById('lotto-form');

    /** @type {HTMLElement} */
    const $firstAnchor = $lottoForm.querySelector('[data-focus-anchor]');

    $lottoForm.querySelector('[data-focus]').removeAttribute('data-focus');
    $firstAnchor.setAttribute('data-focus', '');
  },
};

export default InputView;
