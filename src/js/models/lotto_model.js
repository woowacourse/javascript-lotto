class LottoModel {
  constructor() {
    this._lottos = []
    this._answerLotto = {
      numbers: null,
      bonus: null,
    }
    this._lottoResult = {
      "6개": { price: 2000000000, count: 0 },
      "5개 + 보너스볼": { price: 30000000, count: 0 },
      "5개": { price: 1500000, count: 0 },
      "4개": { price: 50000, count: 0 },
      "3개": { price: 5000, count: 0 },
    }
  }

  get lottos() {
    return this._lottos
  }

  get answerLotto() {
    return this._answerLotto
  }

  get lottoResult() {
    return this._lottoResult
  }

  addLotto(newLotto) {
    this._lottos.push(newLotto)
  }

  addAnswerLotto(numbers, bonus) {
    this._answerLotto = { numbers, bonus }
  }

  calculateLottosResult() {
    const calculateLottoResult = (lotto) => {
      const match = lotto.numbers.filter((x) =>
        this._answerLotto.numbers.includes(x)
      ).length
      const bonusMatch = lotto.numbers.includes(this._answerLotto.bonus)

      let key = ""
      if (match === 6) {
        key = "6개"
      } else if (match === 5 && bonusMatch) {
        key = "5개 + 보너스볼"
      } else if (match === 5 || (match === 4 && bonusMatch)) {
        key = "5개"
      } else if (match === 4 || (match === 3 && bonusMatch)) {
        key = "4개"
      } else if (match === 3 || (match === 2 && bonusMatch)) {
        key = "3개"
      }

      key && this._lottoResult[key].count++
    }

    this._lottos.forEach(calculateLottoResult)
  }

  get profit() {
    const income = Object.values(this._lottoResult).reduce((acc, cur) => {
      return acc + cur.price * cur.count
    }, 0)

    return (income / (this._lottos.length * 1000) - 1) * 100
  }

  resetLottoResult() {
    for (let i in this._lottoResult) {
      this._lottoResult[i].count = 0
    }
  }

  init() {
    this._lottos = []
    this.resetLottoResult()
  }
}
export default LottoModel
