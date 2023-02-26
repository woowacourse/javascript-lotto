import Validator from "../utils/Validator.js";
import { SETTINGS, SCORE, ERROR_MESSAGE } from "../constants/Config.js";
import { $, $$ } from "../utils/Dom.js";
import Lotto from "../domain/Lotto.js";
import Random from "../utils/Random.js";
import Lottos from "../domain/Lottos.js";

class WebController {
  #lottoArray;
  #winningLotto;
  #bonusNumber;

  constructor() {
    this.#lottoArray = [];
    this.#winningLotto = [];
    this.#bonusNumber = 0;
    this.play();
  }

  play() {
    $(".input-money-btn").addEventListener("click", this.getBuyMoney);
    $(".check-winning-lotto-btn").addEventListener("click", this.compareLottos);
    $(".restart-btn").addEventListener("click", this.retry);
    $(".close-modal").addEventListener("click", this.closeModal);
  }

  getBuyMoney = (e) => {
    e.preventDefault();
    try {
      const buyMoney = $(".input-money").value;
      this.validateBuyMoney(buyMoney);
      const lottoAmount = parseInt((buyMoney / SETTINGS.DIVIDE_MONEY_VALUE, 10));
      this.createLotto(lottoAmount);
      this.printLotto(lottoAmount);
      $(".hidden-area").classList.add("show");
    } catch (e) {
      alert(e.message);
      this.#lottoArray = [];
    }
  };

  validateBuyMoney(buyMoney){
    Validator.isNumber(buyMoney);
    Validator.isDividedByThousand(buyMoney);
    Validator.isPositiveInteger(buyMoney);
  };

  createLotto(lottoAmount) {
    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto(Random.getnerateRandomNumbers());
      this.#lottoArray.push(lotto);
    }
  };

  printLotto(lottoAmount){
    $(".purchase-amount").innerHTML = `총 ${lottoAmount}개를 구매하였습니다.`;

    const lottoList = this.#lottoArray
      .map((lotto) => {
        lotto.sortLottoNumbers();
        return `<li>🎟️ ${lotto.getLottoNumbers()}</li>`;
      })
      .join("");

    $(".print-lottos-list").innerHTML = lottoList;
  };

  getWinningNumbers(){
    try {
      for (let i = 0; i < SETTINGS.MAX_WINNING_NUMBER_LENGTH; i++) {
        if ($$(".winning-number")[i].value === "") {
          throw new Error(ERROR_MESSAGE.EMPTY_INPUT);
        }
        this.#winningLotto.push(parseInt($$(".winning-number")[i].value, 10));
      }

      this.validateWinningNumbers(this.#winningLotto);
      return this.#winningLotto;
    } catch (e) {
      alert(e.message);
      this.#winningLotto = [];
    }
  };

  validateWinningNumbers(winningLottoNumbers) {
    Validator.isDuplicatedNumber(winningLottoNumbers);
    Validator.isCorrectLength(winningLottoNumbers);
    
    for (let i = 0; i < winningLottoNumbers.length; i++) {
      this.checkEachNumber(winningLottoNumbers[i]);
    }
  };

  checkEachNumber(eachNumber) {
    Validator.isNumber(eachNumber);
    Validator.isCorrectRange(eachNumber);
    Validator.isPositiveInteger(eachNumber);
  };

  getBonusNumber(){
    try {
      this.#bonusNumber = parseInt($(".bonus-number").value, 10);
      this.validateBonusNumber();
      this.checkEachNumber(this.#bonusNumber);
      return this.#bonusNumber;
    } catch (e) {
      alert(e.message);
      this.#bonusNumber = 0;
    }
  };

  validateBonusNumber(){
    Validator.hasBonusNumber(this.#bonusNumber, this.#winningLotto);
  };

  compareLottos = (e) => {
    e.preventDefault();

    this.getWinningNumbers();
    this.getBonusNumber();
    const lottos = new Lottos(this.#lottoArray);

    lottos.getLottos().forEach((lotto) => {
      lotto.compareNumbers(this.#winningLotto);
      lotto.checkBonusNumber(this.#bonusNumber);
    });

    lottos.compareLottosScore();
    this.printResult(lottos);
  };

  printResult(lottos){
    $(".lotto-result-wrap").classList.add("show");
    $(".three").innerHTML = `${lottos.getLottoRanking()[SCORE.THREE]}개`;
    $(".four").innerHTML = `${lottos.getLottoRanking()[SCORE.FOUR]}개`;
    $(".five").innerHTML = `${lottos.getLottoRanking()[SCORE.FIVE]}개`;
    $(".five-bonus").innerHTML = `${lottos.getLottoRanking()[SCORE.FIVE_BONUS]}개`;
    $(".six").innerHTML = `${lottos.getLottoRanking()[SCORE.SIX]}개`;

    lottos.calculateBenefit();
    const totalBenefit = lottos.getBenefitRate($(".input-money").value);
    $(".result-message").innerHTML = `당신의 총 수익률은 ${totalBenefit}%입니다.`;
    
    this.resetScore(lottos);
    this.#winningLotto = [];
  };

  resetScore(lottos){
    for (const lotto of lottos.getLottos()) {
      lotto.resetScore();
    }
  };

  closeModal = () => {
    $(".lotto-result-wrap").classList.remove("show");
  };

  retry = () => {
    this.#lottoArray = [];
    this.#winningLotto = [];
    this.#bonusNumber = 0;
    $(".hidden-area").classList.remove("show");
    $(".lotto-result-wrap").classList.remove("show");

    for (var i = 0; i < $$(".winning-number").length; i++) {
      $$(".winning-number")[i].value = "";
    }
    $(".bonus-number").value = "";
    $(".input-money").value = "";
  };
}

export default WebController;
