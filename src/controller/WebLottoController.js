import LottoMoney from "../domain/LottoMoney.js";
import LottoNumber from "../domain/LottoNumber.js";
import { calculateTotalPrize } from '../domain/calculateTotalPrize.js';
import getLottoRank from "../domain/getLottoRank.js";
import { generateRandomLottos, generateWinningLotto } from "../domain/lottoGenerator.js";
import { calculateProfitRate } from '../utils/calculateProfitRate.js';
import modal from "../view/modal.js";
import view from "../view/view.js";

class WebLottoController {
  #lottoMoney;

  #randomLottos;

  #winningLotto;

  getMoney(moneyInput) {
    try {

      this.#lottoMoney = new LottoMoney(moneyInput);
      this.#randomLottos = this.#generateRandomLottos(this.#lottoMoney.getLottoCount());
      this.#printRandomLottos(this.#randomLottos);
      view.printWinningLottoAndBonusInputForm();
      // 랜덤 번호와 정답 번호 입력 창 렌더링
    } catch (e) {
      alert(e);
    }
  }

  getWinningLottoAndBonus() {}

  #generateRandomLottos(money) {
    const randomLottos = generateRandomLottos(money);

    this.#printRandomLottos(randomLottos);

    return randomLottos;
  }

  #printRandomLottos(randomLottos) {
    const randomLottosUnpack = randomLottos.map((lotto) => lotto.get());
    view.printRandomLottos(randomLottosUnpack);
  }

  initWinningLotto(winningLottoInput, bonusNumberInput) {
    try {
      const winningLotto = generateWinningLotto(winningLottoInput);
      const bonusNumber = new LottoNumber(bonusNumberInput);

      winningLotto.setBonusNumber(bonusNumber);

      this.#winningLotto = winningLotto;

      this.printRankAndProfitRate();
    } catch (e) {
      alert(e);
    }
  }

  printRankAndProfitRate() {
    modal.openModal();

    const ranks = getLottoRank({
      winningLotto: this.#winningLotto.get(),
      bonusLottoNumber: this.#winningLotto.getBonusNumber(),
      randomLottos: this.#randomLottos,
    });

    view.printRank(ranks);
    this.printProfitRate(ranks)
  }

  printProfitRate(ranks) {
    const totalPrize = calculateTotalPrize(ranks);
    const profitRate = calculateProfitRate(totalPrize, this.#lottoMoney.get());

    view.printProfitRate(profitRate);
  }

  restart() {
    modal.closeModal();
    view.removeRandomLottosAndWinningForm();
    view.clearForm();
  }
}

export default WebLottoController;

/**
 * 핸들러를 장착한다. 그 안의 콟백은 랜덤 로또 출력하기와 정답 입력창 만들기
 * 그리고 정답 인풋의 핸들러를 장착한다.
 *
 * 정답 인풋의 핸들러를 클릭하면 모달이 뜬다.
 */
