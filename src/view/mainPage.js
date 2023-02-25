const inputAmount = document.querySelector("#inputAmount");
const inputAmountNext = document.querySelector("#inputAmountNext");
const randomLottoList = document.querySelector("#randomLottoList");
const inputAmountArea = document.querySelector(".inputAmountArea");
import { ControlElem } from "../utils/ControlElem";

const mainPage = {
  addEvent(callback) {
    inputAmountArea.addEventListener("submit", (event) => {
      callback();
      event.preventDefault();
    });
  },

  getInputAmount() {
    return inputAmount.value;
  },

  clickInputAmount(randomLotteries) {
    ControlElem.resetElem(inputAmount, "value");

    if (!randomLotteries) return;

    this.showRandomLottoAmount(randomLotteries);
    this.showRandomLottoList(randomLotteries);
  },

  showRandomLottoAmount(randomLotteries) {
    document.querySelector(
      ".randomLottoAmount"
    ).textContent = `${randomLotteries.length}`;
  },

  showRandomLottoList(randomLotteries) {
    ControlElem.resetElem(randomLottoList, "innerHTML");

    this.makeRandomLottoList(randomLotteries);

    inputAmountNext.style.display = "block";
  },

  makeRandomLottoList(randomLotteries) {
    const nodeRandomLotto = randomLotteries.map((numbers) => {
      return ControlElem.makeRandomLotto(numbers);
    });
    randomLottoList.insertAdjacentHTML("beforeend", nodeRandomLotto.join(" "));
  },
};

export default mainPage;
