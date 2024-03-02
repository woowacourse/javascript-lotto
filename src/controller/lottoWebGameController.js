import lottoMachine from '../domain/lottoMachine';
import webOutputView from '../view/webView/webOutputView';
import webInputView from '../view/webView/webInputView';
import WinningLottoGenerator from './winningLottoGenerator';
import LottoResultCalculator from '../domain/lottoResultCalculator';
import { LOTTO_PRICE } from '../constants/lotto-constants';

class lottoGameWebController {
  #lottoTickets;
  #winningLotto;

  constructor() {
    this.bindEventListener();
    this.handleAutoFocusOnNumberInput();
  }

  bindEventListener() {
    document.querySelector('#purchase-form').addEventListener('submit', this.handleClickPurchaseButton);
    document.querySelector('#result-button').addEventListener('click', this.handleWinningLottoInput);
    document.querySelector('#modal-close-button').addEventListener('click', this.handleRestartGame);
    document.querySelector('#retry-button').addEventListener('click', this.handleRestartGame);
  }

  handleClickPurchaseButton = (event) => {
    event.preventDefault();
    const purchaseAmountInput = event.target.querySelector('#purchaseAmount-input');
    const purchaseAmount = purchaseAmountInput.value;
    const lottoPurchaseArticle = document.getElementById('lottoPurchase-article');

    try {
      this.#lottoTickets = lottoMachine.makeLottos(purchaseAmount);
      webOutputView.renderPurchaseAmount(this.#lottoTickets);
      webOutputView.renderLottoList(this.#lottoTickets);
      lottoPurchaseArticle.style.display = 'block';
    } catch (error) {
      alert(error.message);
      return;
    }

    purchaseAmountInput.value = '';
  };

  handleAutoFocusOnNumberInput = () => {
    const inputs = document.querySelectorAll('#winning-lotto input');
    let timeout = null;

    inputs.forEach((input, index) => {
      input.addEventListener('input', function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const value = e.target.value;

          if (value.length >= 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        }, 700);
      });
    });
  };

  handleWinningLottoInput = async () => {
    try {
      const winningLottoGenerator = new WinningLottoGenerator(webInputView);
      const { winningLottoNumbers, bonusNumber } = await winningLottoGenerator.createWinningLotto();
      this.#winningLotto = { winningLottoNumbers, bonusNumber };
    } catch (error) {
      alert(error.message);
      return;
    }

    const { totalResult, profit } = this.getLottoResult();
    this.displayResult({ totalResult, profit });
  };

  getLottoResult = () => {
    const lottoResultCalculator = new LottoResultCalculator({
      lottoList: this.#lottoTickets,
      winningLottoNumbers: this.#winningLotto.winningLottoNumbers,
      bonusNumber: this.#winningLotto.bonusNumber,
    });
    const totalResult = lottoResultCalculator.getTotalResult();
    const profit = lottoResultCalculator.getProfit(this.#lottoTickets.length * LOTTO_PRICE);

    return { totalResult, profit };
  };

  displayResult = ({ totalResult, profit }) => {
    const resultTable = document.querySelector('#modal-background');
    resultTable.style.display = 'flex';
    webOutputView.renderTalbe(totalResult);
    webOutputView.renderProfit(profit);
  };

  handleRestartGame = () => {
    document.getElementById('lottoPurchase-article').style.display = 'none';
    document.querySelector('#modal-background').style.display = 'none';

    document.querySelector('#purchaseAmount-input').value = '';

    webOutputView.clearLottoList();
    webOutputView.clearResults();
    webOutputView.clearWinningLotto();

    this.#lottoTickets = [];
    this.#winningLotto = null;
    this.#winningLotto = null;
  };
}

new lottoGameWebController();
