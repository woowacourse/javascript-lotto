class LottoModel {
  constructor() {
    this._lottos = []
    this._answerLotto = {
      numbers: null,
      bonus: null,
    }
  }

  get lottos() {
    return this._lottos
  }

  get answerLotto() {
    return this._answerLotto
  }

  addLotto(newLotto) {
    this._lottos.push(newLotto)
  }

  addAnswerLotto(numbers, bonus) {
    this._answerLotto = {
      numbers,
      bonus,
    }
  }

  init() {
    this._lottos = []
  }
}
export default LottoModel
