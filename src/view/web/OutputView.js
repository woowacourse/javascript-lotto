import Messages from '../../constant/Messages';
import Lotto from '../../domain/lotto/Lotto';
import LottoResult from '../../domain/LottoResult';
import Reward from '../../domain/reward/Reward';
import { LtLottoResult, LtTypography } from './component';
import LtLottoList from './component/LtLottoList';

const OutputView = {
  /**
   * @param {Lotto[]} lottos
   */
  printLottos(lottos) {
    /** @type {LtLottoList} */
    const $boughtLottos = document.getElementById('bought-lottos');

    $boughtLottos.setLottos(lottos);
    OutputView.focusNextAnchor();
  },

  /**
   * @param {LottoResult} lottoResult
   * @param {Reward} rewards
   */
  printLottoResult(lottoResult, rewards) {
    /** @type {HTMLDialogElement} */
    const $lottoResultDialog = document.getElementById('lotto-result-dialog');
    /** @type {LtLottoResult} */
    const $lottoResult = document.getElementById('lotto-result');

    $lottoResult.setLottoResult(lottoResult);
    $lottoResult.setRewards(rewards);

    $lottoResultDialog.showModal();
    OutputView.focusNextAnchor();
  },

  /**
   * @param {number} profitRate
   */
  printProfitRate(profitRate) {
    /** @type {LtTypography} */
    const $lottoResultProfitRate = document.getElementById('lotto-result-profit-rate');

    $lottoResultProfitRate.innerText = Messages.format(
      Messages.PRINT_PROFIT_RATE,
      (profitRate * 100).toFixed(2),
    );
  },

  printExit() {},

  focusNextAnchor() {
    /** @type {HTMLFormElement} */
    const $lottoForm = document.getElementById('lotto-form');
    /** @type {HTMLElement | null} */
    const $nextAnchor = $lottoForm.querySelector('[data-focus] ~ [data-focus-anchor]');

    if (!$nextAnchor) return;

    $lottoForm.querySelector('[data-focus]').removeAttribute('data-focus');
    $nextAnchor.setAttribute('data-focus', '');
  },
};

export default OutputView;
