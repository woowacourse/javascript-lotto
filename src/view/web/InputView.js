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

    const money = $money.getMoney();
    if (money === null) throw new LottoError('로또 번호를 입력해주세요!');

    return money;
  },

  /**
   * @returns {Promise<WinningLotto>}
   */
  async readWinningLotto() {
    /** @type {LtWinningLottoInput} */
    const $winningLotto = document.getElementById('winning-lotto');

    const winningLotto = $winningLotto.getWinningLotto();
    if (!(winningLotto instanceof WinningLotto)) throw new LottoError('당첨 번호를 입력해주세요!');

    return winningLotto;
  },

  /**
   *
   * @returns {Promise<string>}
   */
  async readRestartCommand() {
    /** @type {HTMLFormElement} */
    const $lottoForms = document.getElementById('lotto-forms');

    $lottoForms.querySelectorAll('form').forEach((form) => form.reset());
    InputView.resetAnchor();
    InputView.resetAutofocus();
    return RestartCommand.YES;
  },

  resetAnchor() {
    /** @type {HTMLFormElement} */
    const $lottoForms = document.getElementById('lotto-forms');

    /** @type {HTMLElement} */
    const $firstAnchor = $lottoForms.querySelector('[data-focus-anchor]');

    $lottoForms.querySelector('[data-focus]').removeAttribute('data-focus');
    $firstAnchor.setAttribute('data-focus', '');
  },

  resetAutofocus() {
    const $firstAutofocus = document.querySelector('[autofocus]');

    setTimeout(() => $firstAutofocus.focus());
  },
};

export default InputView;
