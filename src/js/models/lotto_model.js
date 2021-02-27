import Ticket from "./ticket.js"
import { RANK } from "../constants/constant.js"
import { getProfitRate } from "../util.js"

class LottoModel {
  #tickets
  #answerLotto
  #lottoResult

  constructor() {
    this.#tickets = []
    this.#answerLotto = {
      numbers: null,
      bonus: null,
    }
    this.#lottoResult = {
      [RANK.FIFTH.TEXT]: { price: RANK.FIFTH.PRICE, count: 0 },
      [RANK.FOURTH.TEXT]: { price: RANK.FOURTH.PRICE, count: 0 },
      [RANK.THIRD.TEXT]: { price: RANK.THIRD.PRICE, count: 0 },
      [RANK.SECOND.TEXT]: { price: RANK.SECOND.PRICE, count: 0 },
      [RANK.FIRST.TEXT]: { price: RANK.FIRST.PRICE, count: 0 },
    }
  }

  #addTicket(ticket) {
    this.#tickets.push(ticket)
  }

  #addAnswerLotto(numbers, bonus) {
    this.#answerLotto = { numbers, bonus }
  }

  #calculateMatch(ticket) {
    const match = ticket.numbers.filter((x) =>
      this.#answerLotto.numbers.includes(x)
    ).length
    const bonusMatch = ticket.numbers.includes(this.#answerLotto.bonus)

    return { match, bonusMatch }
  }

  get tickets() {
    return this.#tickets
  }

  get answerLotto() {
    return this.#answerLotto
  }

  get lottoResult() {
    return this.#lottoResult
  }

  generateRandomTicket() {
    const ticket = new Ticket()
    ticket.generateRandomNumbers()
    this.#addTicket(ticket)
  }

  calculateLottosResult(numbers, bonus) {
    const calculateLottoResult = (ticket) => {
      const { match, bonusMatch } = this.#calculateMatch(ticket)

      let key = ""
      switch (true) {
        case match === 6:
          key = RANK.FIRST.TEXT
          break
        case match === 5 && bonusMatch:
          key = RANK.SECOND.TEXT
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

      key && this.#lottoResult[key].count++
    }

    this.#addAnswerLotto(numbers, bonus)
    this.#tickets.forEach(calculateLottoResult)
  }

  get profitRate() {
    const income = Object.values(this.#lottoResult).reduce((acc, cur) => {
      return acc + cur.price * cur.count
    }, 0)
    return getProfitRate(income, this.#tickets.length * 1000)
  }

  resetLottoResult() {
    for (let i in this.#lottoResult) {
      this.#lottoResult[i].count = 0
    }
  }

  init() {
    this.#tickets = []
    this.resetLottoResult()
  }
}
export default LottoModel
