class LottoMachine {
  #lottoNumbers = [];
  constructor(ticketCount, generatedLottos) {
    this.#lottoNumbers = this.createGenerateLottos(ticketCount, [
      ...generatedLottos,
    ]);
  }
}

export default LottoMachine;
