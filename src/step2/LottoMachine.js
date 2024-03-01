class LottoMachine {
  #lottoNumbers = [];
  constructor(ticketCount, generatedLottos) {
    this.#lottoNumbers = this.createGenerateLottos(ticketCount, [
      ...generatedLottos,
    ]);
  }

  createGenerateLottos(ticketCount, generatedLottos) {
    const lottoNumbers = [];
    for (let i = 0; i < ticketCount; i++) {
      lottoNumbers.push(generatedLottos[i]);
    }
    return lottoNumbers;
    //원래 하나씩 UI 에 넣었는데, 이제는 전부 문자열로 만든 후 innerHtml 로 넣기
    //lottoumbers 는 ["1,2,3,4,5,6","1,2,3,4,5,6"] 이런식으로 되어있음
  }

  get generatedLottos() {
    return this.#lottoNumbers;
  }
}

export default LottoMachine;
