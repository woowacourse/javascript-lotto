import Lotto from "../domain/Lotto.js";

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

  getStatistics(lottosRaw, { winningNumbers, bonusNumber }) {
    if (!lottosRaw || lottosRaw.length === 0) {
      throw new Error("구매한 로또가 없습니다.");
    }

    const lottos = Lotto.fromList(lottosRaw);
    const winningLotto = this.#winningUseCase.execute(
      winningNumbers,
      bonusNumber,
    );

    const lottoStatsDto = this.#statisticsUseCase.statisticsLottos(
      lottos,
      winningLotto,
    );

    return lottoStatsDto;
  }
}
