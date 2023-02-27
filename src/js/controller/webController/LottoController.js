import Comparer from '../../domain/Comparer';
import LottoMachine from '../../domain/LottoMachine';
import ProfitCalculator from '../../domain/ProfitCaculator';
import Validate from '../../domain/Validate';
import WinningLotto from '../../domain/WinningLotto';
import { $, $$ } from '../../util/dom';

export default class LottoController {
  #lottoMachine;
  #lottos;
  #purchaseAmount;

  constructor() {
    $('.purchaseLotto').addEventListener('submit', this.purchaseLotto.bind(this));
    $('.inputNumbersForm').addEventListener('submit', this.printResult.bind(this));
    $('.restartButton').addEventListener('click', this.resetGame.bind(this));
    $('.exit').addEventListener('click', this.exitModal.bind(this));
  }

  purchaseLotto(e) {
    const moneyInput = $('.moneyInput').value;
    $('.lottos').innerHTML = ``;
    e.preventDefault();
    try {
      Validate.purchaseAmount(moneyInput);
      this.showLotto(moneyInput);
      this.#purchaseAmount = moneyInput;
    } catch (error) {
      alert(error.message);
    }
  }

  showLotto = async (money) => {
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
      $('.lottos').innerHTML += `<div class="lotto"><span class="lottoEmoji">🎟️</span> ${lotto.join(
        ', ',
      )}</div>`;
    });
  }

  printResult(e) {
    e.preventDefault();
    // const winningNumbers = new Array(6).fill().map((v, i) => Number(winningNumber[i].value));
    const winningNumbers = Array.from({ length: 6 }, (v, i) =>
      Number($$('.winningNumber-input')[i].value),
    );

    try {
      Validate.winningNumber(winningNumbers.join(','));
      Validate.bonusNumber($('.bonusNumberInput').value, winningNumbers);
      const winningLotto = new WinningLotto(winningNumbers, Number($('.bonusNumberInput').value));
      const ranking = new Comparer(winningLotto, this.#lottos).getStatistics();
      $('.modal').style.display = 'flex';

      Object.values(ranking).forEach((count, i) => {
        $$('.matchCount')[i].innerText = count;
      });

      $('.profitRate').innerText = new ProfitCalculator(ranking).getProfitRate(
        this.#purchaseAmount,
      );
    } catch (error) {
      alert(error.message);
    }
  }

  resetGame(e) {
    e.preventDefault();
    $('.modal').style.display = 'none';
    $('.youBought').style.display = 'none';
    $('.issueLotto').style.display = 'none';
    $('.inputNumbersLayout').style.display = 'none';
    $('.moneyInput').value = '';
    $$('.inputNumber').forEach((v, i) => {
      $$('.inputNumber')[i].value = '';
    });
    $('.lottos').innerHTML = ``;
    this.#lottos = [];
  }

  exitModal(e) {
    e.preventDefault();
    $('.modal').style.display = 'none';
  }
}
