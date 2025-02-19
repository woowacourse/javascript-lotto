import Lotto from "./Lotto";
class LottoPack {
  #lottos;
  constructor(lottos) {
    this.#lottos = this.#generateLottos(lottos);
  }

  #generateLottos(lottos) {
    return lottos.map((lottoNumbers) => {
      return new Lotto(lottoNumbers);
    });
  }
  get lottos() {
    return this.#lottos;
  }
}

export default LottoPack;
