import Lotto from "../domain/Lotto.js";
import Money from "../domain/Money.js";

export default class LottoFacade {
  #purchaseUseCase;
  #winningUseCase;
  #statisticsUseCase;

  constructor({ purchaseUseCase, winningUseCase, statisticsUseCase }) {
    this.#purchaseUseCase = purchaseUseCase;
    this.#winningUseCase = winningUseCase;
    this.#statisticsUseCase = statisticsUseCase;
  }

  purchase(amount) {
    return this.#purchaseUseCase.execute(amount);
  }

  getStatistics({ lottosRaw, purchasedRaw, winningNumbers, bonusNumber }) {
    if (!lottosRaw || lottosRaw.length === 0) {
      throw new Error("구매한 로또가 없습니다.");
    }

    const lottos = Lotto.fromList(lottosRaw);
    const winningNumber = this.#winningUseCase.execute(
      winningNumbers,
      bonusNumber,
    );
    const purchasedMoney = new Money(purchasedRaw);
    const lottoStatsDto = this.#statisticsUseCase.statisticsLottos({
      lottos,
      winningNumber,
      purchasedMoney,
    });

    return lottoStatsDto;
  }
}
