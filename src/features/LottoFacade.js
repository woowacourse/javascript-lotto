export default class LottoFacade {
  #purchaseUseCase;
  #statisticsUseCase;

  constructor({ purchaseUseCase, statisticsUseCase }) {
    this.#purchaseUseCase = purchaseUseCase;
    this.#statisticsUseCase = statisticsUseCase;
  }

  purchase({ amountRaw }) {
    return this.#purchaseUseCase.execute({ amountRaw });
  }

  getStatistics({
    lottosRaw,
    purchasedRaw,
    winningNumbersRaw,
    bonusNumberRaw,
  }) {
    const lottoStatsDto = this.#statisticsUseCase.statisticsLottos({
      lottosRaw,
      winningNumbersRaw,
      bonusNumberRaw,
      purchasedRaw,
    });

    return lottoStatsDto;
  }
}
