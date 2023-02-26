const inputAmountElem = document.querySelector("#inputAmount");
const inputAmountNextElem = document.querySelector("#inputAmountNext");
const randomLottoListElem = document.querySelector("#randomLottoList");
const inputAmountAreaElem = document.querySelector(".inputAmountArea");
import { ControlElem } from "../utils/ControlElem";

const mainPage = {
  addEvent(callback) {
    inputAmountAreaElem.addEventListener("submit", (event) => {
      callback();
      event.preventDefault();
    });
  },

  getInputAmount() {
    return inputAmountElem.value;
  },

  clickInputAmount(randomLotteries) {
    ControlElem.resetElem(inputAmountElem, "value");

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
    ControlElem.resetElem(randomLottoListElem, "innerHTML");

    this.makeRandomLottoList(randomLotteries);

    inputAmountNextElem.style.display = "block";
  },

  makeRandomLottoList(randomLotteries) {
    const nodeRandomLotto = randomLotteries.map((numbers) => {
      return ControlElem.makeRandomLotto(numbers);
    });
    randomLottoListElem.insertAdjacentHTML(
      "beforeend",
      nodeRandomLotto.join(" ")
    );
  },
};

export default mainPage;
