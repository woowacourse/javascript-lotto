import LottoMoney from "../domain/LottoMoney.js";
import LottoNumber from "../domain/LottoNumber.js";
import { calculateTotalPrize } from "../domain/calculateTotalPrize.js";
import getLottoRank from "../domain/getLottoRank.js";
import { generateRandomLottos, generateWinningLotto } from "../domain/lottoGenerator.js";
import BonusNumberError from "../error/BonusNumberError.js";
import LottoError from "../error/LottoError.js";
import { calculateProfitRate } from "../utils/calculateProfitRate.js";
import catchReturnInWeb from "../utils/web/catchReturnInWeb.js";
import modal from "../view/web/modal.js";
import toast from "../view/web/toast.js";

class WebLottoController {
  #inputView;

  #outputView;

  constructor(inputView, outputView) {
    this.#inputView = inputView;
    this.#outputView = outputView;
  }

  async game() {
    const money = await catchReturnInWeb(this.getMoney.bind(this));
    const randomLottos = this.generateRandomLottos(money.getLottoCount());
    const winningLotto = await this.initWinningLotto();
    this.#outputView.blockWinningLottoAndBonusInput();
    const rank = this.calcRank({
      winningLotto: winningLotto.get(),
      bonusNumber: winningLotto.getBonusNumber(),
      randomLottos,
    });

    this.printProfitRate(money.get(), rank);
    await this.restart();
  }

  async getMoney() {
    const moneyInput = await this.#inputView.readMoney();

    const money = new LottoMoney(moneyInput);

    this.#outputView.blockMoneyInput();

    return money;
  }

  generateRandomLottos(money) {
    const randomLottos = generateRandomLottos(money);

    this.printRandomLottos(randomLottos);
    this.#outputView.printWinningLottoAndBonusInputForm();

    return randomLottos;
  }

  async initWinningLotto() {
    try {
      return await this.getWinningLottoAndBonusNumber();
    } catch (error) {
      toast(error.message);
      if (error instanceof LottoError) this.#outputView.resetTargetForm("#winningLottoInputForm");
      if (error instanceof BonusNumberError) this.#outputView.resetTargetForm("#bonusInputForm");

      return await this.initWinningLotto();
    }
  }

  async getWinningLottoAndBonusNumber() {
    const [winningLottoInput, bonusNumberInput] = await this.#inputView.readWinningLottoNumbersAndBonus();
    const winningLotto = generateWinningLotto(winningLottoInput);
    const bonusNumber = new LottoNumber(bonusNumberInput);

    winningLotto.setBonusNumber(bonusNumber);

    return winningLotto;
  }

  printRandomLottos(randomLottos) {
    const randomLottosUnpack = randomLottos.map((lotto) => lotto.get());

    this.#outputView.printRandomLottos(randomLottosUnpack);
  }

  printProfitRate(money, ranks) {
    const totalPrize = calculateTotalPrize(ranks);
    const profitRate = calculateProfitRate(totalPrize, money);

    this.#outputView.printProfitRate(profitRate);
  }

  calcRank({ winningLotto, bonusLottoNumber, randomLottos }) {
    modal.openModal();

    const ranks = getLottoRank({ winningLotto, bonusLottoNumber, randomLottos });

    this.#outputView.printRanks(ranks);

    return ranks;
  }

  async restart() {
    this.#inputView.restart(() => {
      modal.closeModal();
      this.#outputView.resetToStart();
      this.game();
    });
  }
}

export default WebLottoController;
