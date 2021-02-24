class LottoModel {
  constructor() {
    this._lottos = []
    this._answerLotto = {
      numbers: null,
      bonus: null,
    }

    this._winnerLotto = {
      "1st": { price: 2000000000, count: 0 },
      "2nd": { price: 30000000, count: 0 },
      "3rd": { price: 1500000, count: 0 },
      "4th": { price: 50000, count: 0 },
      "5th": { price: 5000, count: 0 },
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

  lottoResult() {
    this._lottos.forEach((lotto) => {
      const match = lotto.numbers.filter((x) =>
        this._answerLotto.numbers.includes(x)
      ).length
      const bonusMatch = lotto.numbers.includes(this._answerLotto.bonus)

      if (match === 6) {
        this._winnerLotto["1st"] = {
          price: 2000000000,
          count: this._winnerLotto["1st"].countcount + 1,
        }
      } else if (match === 5 && bonusMatch) {
        this._winnerLotto["2nd"] = {
          price: 30000000,
          count: this._winnerLotto["2nd"].count + 1,
        }
      } else if (match === 5 || (match === 4 && bonusMatch)) {
        this._winnerLotto["3rd"] = {
          price: 1500000,
          count: this._winnerLotto["3rd"].count + 1,
        }
      } else if (match === 4 || (match === 3 && bonusMatch)) {
        this._winnerLotto["4th"] = {
          price: 50000,
          count: this._winnerLotto["4th"].count + 1,
        }
      } else if (match === 3 || (match === 2 && bonusMatch)) {
        this._winnerLotto["5th"] = {
          price: 5000,
          count: this._winnerLotto["5th"].count + 1,
        }
      }
    })

    console.log(this._winnerLotto)
  }

  init() {
    this._lottos = []
  }
}
export default LottoModel
