import lottoMachine from '../domain/lottoMachine.js';
import webOutputView from '../view/webView/webOutputView.js';
import webInputView from '../view/webView/webInputView.js';
import WinningLottoGenerator from './winningLottoGenerator.js';
import LottoResultCalculator from '../domain/lottoResultCalculator.js';
import { LOTTO_PRICE } from '../constants/lotto-constants.js';

class LottoGameWebController {
  #lottoTickets;
  #winningLotto;

  constructor() {
    this.bindEventListener();
    this.handleAutoFocusOnNumberInput();
  }

  bindEventListener() {
    document.querySelector('#purchase-form').addEventListener('submit', this.handleClickPurchaseButton);
    document.querySelector('#winning-lotto').addEventListener('submit', this.handleWinningLottoInput);
    document.querySelector('#modal-close-button').addEventListener('click', this.handleRestartGame);
    document.querySelector('#retry-button').addEventListener('click', this.handleRestartGame);
    document.querySelector('#modal').addEventListener('click', this.handleModalDeem);
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

    webOutputView.clearWinningLotto();
    this.focusOnFirstLottoInput();
  };

  handleAutoFocusOnNumberInput = () => {
    document.addEventListener('DOMContentLoaded', () => {
      const inputs = document.querySelectorAll('.lotto-input');

      inputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
          if (input.value.length > 2) {
            input.value = input.value.substring(0, 2);
            return;
          }

          if (input.value.length === 2) {
            clearTimeout(input.delay);
            this.moveToNextField(index, inputs);
          } else if (input.value.length === 1) {
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

  focusOnFirstLottoInput = () => {
    const firstLottoInput = document.querySelector('.lotto-input');
    if (firstLottoInput) {
      firstLottoInput.focus();
    }
  };

  handleWinningLottoInput = async (event) => {
    event.preventDefault();
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
    const modal = document.querySelector('#modal');

    webOutputView.renderTable(totalResult);
    webOutputView.renderProfit(profit);

    modal.showModal();
  };

  handleRestartGame = () => {
    document.getElementById('lottoPurchase-article').style.display = 'none';
    document.querySelector('#purchaseAmount-input').value = '';

    webOutputView.clearResults();
    webOutputView.clearWinningLotto();

    modal.close();
    this.#lottoTickets = [];
    this.#winningLotto = null;
  };

  handleModalDeem = (event) => {
    const modal = document.querySelector('#modal');
    if (event.target === modal) {
      this.handleRestartGame();
    }
  };
}

new LottoGameWebController();
