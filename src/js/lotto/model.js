class LottoModel {
  #lottos

  constructor() {
    this.#lottos = []
  }

  get lottos() {
    return this.#lottos
  }

  get amount() {
    return this.#lottos.length
  }

  addLotto(newLotto) {
    this.#lottos.push(newLotto)
  }

  init() {
    this.#lottos = []
  }
}
export default LottoModel
