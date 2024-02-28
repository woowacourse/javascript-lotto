import Observable from "../abstract/Observable.js";

export default class LottosState extends Observable {
  #lottos = [];

  getLottos() {
    return this.#lottos;
  }

  setLottos(lottos) {
    this.#lottos = lottos;

    this.notify();
  }
}
