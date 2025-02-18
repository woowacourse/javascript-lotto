import Lotto from "./Lotto";
class LottoPack {
  constructor(lottos) {
    this.lottos = this.generateLottos(lottos);
  }

  generateLottos(lottos) {
    return lottos.map((lottoNumber) => {
      return new Lotto(lottoNumber);
    });
  }
}

export default LottoPack;
