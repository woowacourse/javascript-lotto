export default class Lottos {
  constructor() {
    this.init();
  }

  init() {
    console.log('Test Lottos');
  }

  getLottos() {
    return this.lottos;
  }

  setLottos(lottos) {
    this.lottos = lottos;
  }
}
