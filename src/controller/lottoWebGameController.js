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
  }

  handleClickPurchaseButton = (event) => {
    event.preventDefault();
    const purchaseAmountInput = event.target.querySelector('#purchaseAmount-input');
    const purchaseAmount = purchaseAmountInput.value;
    const lottoPurchaseArticle = document.getElementById('lottoPurchase-article');

    try {
      this.#lottoTickets = lottoMachine.makeLottos(purchaseAmount);
      webOutputView.renderLottoList(this.#lottoTickets);
      lottoPurchaseArticle.style.display = 'block';
    } catch (error) {
      alert(error.message);
      return;
    }

    //
    purchaseAmountInput.value = '';
  };

  handleAutoFocusOnNumberInput = () => {
    const inputs = document.querySelectorAll('#winning-lotto input');

    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        if (input.value.length === input.maxLength) {
          if (index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        }
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

    const totalResult = this.getLottoResult();
    this.displayResult(totalResult);
  };

  getLottoResult = () => {
    const lottoResultCalculator = new LottoResultCalculator({
      lottoList: this.#lottoTickets,
      winningLottoNumbers: this.#winningLotto.winningLottoNumbers,
      bonusNumber: this.#winningLotto.bonusNumber,
    });
    const totalResult = lottoResultCalculator.getTotalResult();
    const profit = lottoResultCalculator.getProfit(this.#lottoTickets.length * LOTTO_PRICE);

    return totalResult;
  };

  displayResult = (totalResult, profit = 0) => {
    const resultTable = document.querySelector('#modal-background');
    resultTable.style.display = 'block';
    webOutputView.renderTalbe(totalResult);
  };
}

new lottoGameWebController();
