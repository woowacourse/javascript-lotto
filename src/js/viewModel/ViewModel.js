import { lottoTemplate } from '../view/webView/View';
import Comparer from './../domain/Comparer';
import LottoMachine from './../domain/LottoMachine';
import ProfitCalculator from './../domain/ProfitCaculator';
import Validator from './../domain/Validator';
import WinningLotto from './../domain/WinningLotto';
import { $, $$ } from './../util/dom';

export default class ViewModel {
  #lottoMachine;
  #lottos;
  #purchaseAmount;

  constructor() {
    this.init();
  }

  init() {
    $('.moneyInput').focus();
    $('.purchaseLotto').addEventListener('submit', this.purchaseLotto.bind(this));
    $('.inputNumbersForm').addEventListener('keydown', this.moveToNextInput.bind(this));
    $('.inputNumbersForm').addEventListener('submit', this.showModal.bind(this));
    $('.modalBox').addEventListener('submit', this.resetGame.bind(this));
    $('.restartButton').addEventListener('keydown', this.pressESC.bind(this));
    $('.exit').addEventListener('click', this.exitModal.bind(this));
    $('.modalBackground').addEventListener('click', this.exitModal.bind(this));
  }

  purchaseLotto(e) {
    const moneyInput = $('.moneyInput').value;
    $('.lottos').innerHTML = ``;
    e.preventDefault();
    try {
      Validator.purchaseAmount(moneyInput);
      this.#purchaseAmount = moneyInput;

      this.showLotto(moneyInput);
      $('.winningNumber-input').focus();
    } catch (error) {
      alert(error.message);
    }
  }

  showLotto = (money) => {
    $('.youBought').style.display = 'block';
    $('.issueLotto').style.display = 'block';
    $('.inputNumbersLayout').style.display = 'block';

    this.#lottoMachine = new LottoMachine(money);

    this.printPurchaseQuantity();
    this.printIssuedLottos();
  };

  printPurchaseQuantity() {
    $('.purchaseQuantity').innerText = this.#lottoMachine.getQuantity();
  }

  printIssuedLottos() {
    this.#lottos = Array.from({ length: this.#lottoMachine.getQuantity() }, () =>
      this.#lottoMachine.issueLotto(),
    );

    this.#lottos.forEach((lotto) => {
      $('.lottos').innerHTML += lottoTemplate(lotto);
    });
  }

  showModal(e) {
    e.preventDefault();
    const winningNumbers = Array.from({ length: 6 }, (v, i) =>
      Number($$('.winningNumber-input')[i].value),
    );

    try {
      Validator.winningNumber(winningNumbers.join(','));
      Validator.bonusNumber($('.bonusNumberInput').value, winningNumbers);
      const winningLotto = new WinningLotto(winningNumbers, Number($('.bonusNumberInput').value));
      const ranking = new Comparer(winningLotto, this.#lottos).getStatistics();
      $('.modal').style.display = 'flex';
      $('.restartButton').focus();

      this.makeWinningStatistics(ranking);
    } catch (error) {
      alert(error.message);
    }
  }

  makeWinningStatistics(ranking) {
    Object.values(ranking).forEach((count, i) => {
      $$('.matchCount')[i].innerText = count;
    });

    $('.profitRate').innerText = new ProfitCalculator(ranking).getProfitRate(this.#purchaseAmount);
  }

  resetGame(e) {
    e.preventDefault();
    $('.modal').style.display = 'none';
    $('.youBought').style.display = 'none';
    $('.issueLotto').style.display = 'none';
    $('.inputNumbersLayout').style.display = 'none';
    $('.moneyInput').value = '';
    $$('.inputNumber').forEach((input) => {
      input.value = '';
    });
    $('.lottos').innerHTML = ``;
    this.#lottos = [];
    $('.moneyInput').focus();
  }

  pressESC(e) {
    if (e.keyCode === 27) {
      $('.exit').click();
    }
  }

  moveToNextInput(e) {
    if (
      e.keyCode === 13 &&
      e.target !== $('.bonusNumberInput') &&
      e.target !== $('.printResultButton')
    ) {
      e.preventDefault();
      $$('.winningNumber-input').forEach((value, i) => {
        if (e.target === $$('.winningNumber-input')[i]) {
          i === 5 ? $('.bonusNumberInput').focus() : $$('.winningNumber-input')[i + 1].focus();
        }
      });
    }
  }

  exitModal(e) {
    e.preventDefault();
    $('.modal').style.display = 'none';
    $('.printResultButton').focus();
  }
}
