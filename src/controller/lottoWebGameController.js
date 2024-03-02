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
    document.addEventListener('DOMContentLoaded', () => {
      const inputs = document.querySelectorAll('.lotto-input');

      inputs.forEach((input, index) => {
        let firstValueEntered = false;

        input.addEventListener('input', (e) => {
          if (input.value.length > 2) {
            input.value = input.value.substring(0, 2);
            return;
          }

          if (input.value.length === 2 && firstValueEntered) {
            clearTimeout(input.delay);
            firstValueEntered = false;
            this.moveToNextField(index, inputs);
          } else if (input.value.length === 1 && !firstValueEntered) {
            firstValueEntered = true;
            input.delay = setTimeout(() => {
              if (input.value.length === 1) {
                input.value = '0' + input.value;
                this.moveToNextField(index, inputs);
              }
            }, 500);
          }
        });
      });
    });
  };

  moveToNextField = (index, inputs) => {
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  };

  handleWinningLottoInput = async () => {
    const winningLottoGenerator = new WinningLottoGenerator({ inputView: webInputView, isWeb: true });

    try {
      const { winningLottoNumbers, bonusNumber } = await winningLottoGenerator.createWinningLotto();
      this.#winningLotto = { winningLottoNumbers, bonusNumber };
    } catch (error) {
      webOutputView.clearWinningLotto();
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
