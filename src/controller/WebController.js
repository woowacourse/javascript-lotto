import Validator from "../utils/Validator.js";
import { SETTINGS, ERROR_MESSAGE } from "../constants/Config.js";
import { $, $$ } from "../utils/Dom.js";
import Lotto from "../domain/Lotto.js";
import Random from "../utils/Random.js";

class WebController {
  #lottoArray;

  constructor() {
    this.#lottoArray = [];
    this.play();
  }

  play() {
    $(".input-money-btn").addEventListener("click", this.getBuyMoney);
  }

  getBuyMoney = (e) => {
    e.preventDefault();

    const buyMoney = $(".input-money").value;
    try {
      this.validateBuyMoney(buyMoney);
      const lottoAmount = parseInt(buyMoney / SETTINGS.DIVIDE_MONEY_VALUE);
      this.createLotto(lottoAmount);
      this.printLotto(lottoAmount);
      $('.hidden-area').classList.add('show');
    } catch (e) {
      alert(e.message);
    } finally {
      this.#lottoArray = [];
    }
  };

  validateBuyMoney = (buyMoney) => {
    Validator.isNumber(buyMoney);
    Validator.isDividedByThousand(buyMoney);
    Validator.isPositiveInteger(buyMoney);
  };

  createLotto = (lottoAmount) => {
    for (let i = 0; i < lottoAmount; i++) {
      const lotto = new Lotto(Random.getnerateRandomNumbers());
      this.#lottoArray.push(lotto);
    }
  };

  printLotto = (lottoAmount) => {
    $(".purchase-amount").innerHTML = `총 ${lottoAmount}개를 구매하였습니다.`;

    const lottoList = this.#lottoArray
      .map((lotto) => {
        lotto.sortLottoNumbers();
        return `<li>🎟️ ${lotto.getLottoNumbers()}</li>`;
      })
      .join("");

    $(".print-lottos-list").innerHTML = lottoList;
  };
}

export default WebController;
