const { RANK } = require("../constant/Constant");
const LottoGame = require("../domain/LottoGame");
const Validation = require("../domain/Validation");

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

class LottoController {
  #lottoGame;
  #lottos;
  #view;

  constructor() {
    $("#show-lotto").style.visibility = "hidden";
    $("#input-winlotto").style.visibility = "hidden";
    $("#submit-winlotto").style.visibility = "hidden";

    const lottoGame = new LottoGame();
    let lottos;

    $("#input-money-form").onsubmit = function (event) {
      event.preventDefault();

      const money = this.money.value;

      lottos = lottoGame.makeLottos(money);

      $(
        "#show-lotto-label"
      ).innerText = `총 ${lottos.length}개를 구매했습니다.`;
      $("#show-lotto").style.visibility = "visible";
      $("#input-winlotto").style.visibility = "visible";
      $("#submit-winlotto").style.visibility = "visible";

      $("#lottos").replaceChildren();
      lottos.forEach((lotto) => {
        const lottoFrame = $("#lotto-default").cloneNode(true);
        lottoFrame.style.display = "block";
        lottoFrame.querySelector(
          ".lotto-numbers"
        ).innerText = `[${lotto.numbers.join(", ")}]`;
        $("#lottos").appendChild(lottoFrame);
      });
    };

    $("#input-winnumber-form").onsubmit = function (event) {
      event.preventDefault();

      const numbers_string = [
        this.num1.value,
        this.num2.value,
        this.num3.value,
        this.num4.value,
        this.num5.value,
        this.num6.value,
      ];
      const numbers = numbers_string.map((num) => parseInt(num));
      const bonusNumber = parseInt(this.bonus.value);
      const winLotto = lottoGame.makeWinLotto(numbers, bonusNumber);

      const rankResult = lottoGame.calculateRankResult(lottos, winLotto);
      const revenue = lottoGame.calculateRevenueRate(rankResult, lottos.length);

      [1, 2, 3, 4, 5].forEach((rank) => {
        $(`#result-rank${rank}`).innerText = `${rankResult[rank]}개`;
      });

      $("#result-revenue").innerText = `당신의 총 수입률은 ${revenue}%입니다`;

      $("#result").style.display = "block";
    };

    $("#restart").addEventListener("click", () => {
      location.reload();
    });

    $("#result-exit").addEventListener("click", () => {
      $("#result").style.display = "none";
    });
  }

  async playLotto() {
    this.#lottoGame = new LottoGame();

    const bonusNumber = await this.readBonusNumber(winNumbers);
    // await this.drawLotto(lottos, winLotto);

    // this.restart();
  }

  async purchaseLotto(money) {
    const lottos = this.#lottoGame.make(money);
    const lottoCount = lottos.length;

    this.#view.printLottoCount(lottoCount);
    this.#view.printPurchaseLottos(lottos);

    return lottos;
  }

  async drawLotto(lottos, winLotto) {
    const lottoCnt = lottos.length;
    const rankResult = this.#lottoGame.calculateRankResult(lottos, winLotto);
    const revenue = this.#lottoGame.calculateRevenueRate(rankResult, lottoCnt);

    this.#view.printRankResult(rankResult);
    this.#view.printRevenue(revenue, lottoCnt);
  }

  async restart() {
    try {
      const command = await this.#view.readCommandRestart();
      Validation.validateRestartCommand(command);
      return command === "y" ? this.playLotto() : this.#view.close();
    } catch (e) {
      this.#view.printErrorMessage(e.message);
      this.restart();
    }
  }

  async readMoney() {
    try {
      const money = await this.#view.readMoney();
      Validation.validateMoney(money);
      return parseInt(money);
    } catch (e) {
      this.#view.printErrorMessage(e.message);
      return this.readMoney();
    }
  }

  async readWinNumbers() {
    try {
      const input = await this.#view.readWinNumbers();
      Validation.validateWinNumber(input.split(","));
      const winNumbers = input.split(",").map((num) => parseInt(num));
      return winNumbers;
    } catch (e) {
      this.#view.printErrorMessage(e.message);
      return this.readWinNumbers();
    }
  }

  async readBonusNumber(numbers) {
    try {
      const input = await this.#view.readBonusNumber();
      Validation.validateBonusNumber(numbers, input);
      const bonusNumber = parseInt(input);
      return bonusNumber;
    } catch (e) {
      this.#view.printErrorMessage(e.message);
      await this.readBonusNumber(numbers);
    }
  }
}

module.exports = LottoController;
