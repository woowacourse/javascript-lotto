import { RANK } from "../constants/constant.js"
import { getProfitRate } from "../util.js"

class LottoModel {
  constructor() {
    this._tickets = []
    this._answerLotto = {
      numbers: null,
      bonus: null,
    }
    this._lottoResult = {
      [RANK.FIRST.TEXT]: { price: RANK.FIRST.PRICE, count: 0 },
      [RANK.SECOND.TEXT]: { price: RANK.SECOND.PRICE, count: 0 },
      [RANK.THIRD.TEXT]: { price: RANK.THIRD.PRICE, count: 0 },
      [RANK.FOURTH.TEXT]: { price: RANK.FOURTH.PRICE, count: 0 },
      [RANK.FIFTH.TEXT]: { price: RANK.FIFTH.PRICE, count: 0 },
    }
  }

  get tickets() {
    return this._tickets
  }

  get answerLotto() {
    return this._answerLotto
  }

  get lottoResult() {
    return this._lottoResult
  }

  addTicket(ticket) {
    this._tickets.push(ticket)
  }

  addAnswerLotto(numbers, bonus) {
    this._answerLotto = { numbers, bonus }
  }

  calculateMatch(ticket) {
    const match = ticket.numbers.filter((x) =>
      this._answerLotto.numbers.includes(x)
    ).length
    const bonusMatch = ticket.numbers.includes(this._answerLotto.bonus)

    return { match, bonusMatch }
  }

  calculateLottosResult() {
    const calculateLottoResult = (ticket) => {
      const { match, bonusMatch } = this.calculateMatch(ticket)

      let key = ""
      switch (true) {
        case match === 6:
          key = RANK.FIRST.TEXT
          break
        case match === 5 && bonusMatch:
          key = RANK.THIRD.TEXT
          break
        case match === 5 || (match === 4 && bonusMatch):
          key = RANK.THIRD.TEXT
          break
        case match === 4 || (match === 3 && bonusMatch):
          key = RANK.FOURTH.TEXT
          break
        case match === 3 || (match === 2 && bonusMatch):
          key = RANK.FIFTH.TEXT
          break
        default:
      }

      key && this._lottoResult[key].count++
    }

    this._tickets.forEach(calculateLottoResult)
  }

  get profitRate() {
    const income = Object.values(this._lottoResult).reduce((acc, cur) => {
      return acc + cur.price * cur.count
    }, 0)

    return getProfitRate(income, this._tickets.length * 1000)
  }

  resetLottoResult() {
    for (let i in this._lottoResult) {
      this._lottoResult[i].count = 0
    }
  }

  init() {
    this._tickets = []
    this.resetLottoResult()
  }
}
export default LottoModel
