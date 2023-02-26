const eachInputLottoNumberElem = document.querySelectorAll(
  ".eachInputLottoNumber"
);
const eachInputBonusNumberElem = document.querySelector(
  ".eachInputBonusNumber"
);
const dialogElem = document.querySelector("dialog");
import { ControlElem } from "../utils/ControlElem";

const resultPage = {
  addEvent(resultCallback) {
    const inputLottoBonusAreaElem = document.querySelector(
      ".inputLottoBonusArea"
    );
    const restartButtonElem = document.querySelector(".restartButton");

    inputLottoBonusAreaElem.addEventListener("submit", (event) => {
      event.preventDefault();
      resultCallback();
    });
    restartButtonElem.addEventListener("click", this.clickRestart);
  },

  clickResult(result) {
    if (!result) return;

    dialogElem.showModal();
    this.showResult(result);
  },

  getLottoBonus() {
    const lotto = [];
    eachInputLottoNumberElem.forEach((eachInputLottoNumberElem) => {
      lotto.push(+eachInputLottoNumberElem.value);
      ControlElem.resetElem(eachInputLottoNumberElem, "value");
    });

    const bonus = +eachInputBonusNumberElem.value;
    ControlElem.resetElem(eachInputBonusNumberElem, "value");

    return [lotto, bonus];
  },

  showResult(result) {
    const winnerCountElem = document.querySelectorAll(".winnerCount");

    winnerCountElem.forEach(
      (rank, index) => (rank.textContent = result[index])
    );
    document.querySelector(".rate").textContent = `${
      result[result.length - 1]
    }`;
  },

  clickRestart() {
    dialogElem.close();
    inputAmountNext.style.display = "none";
  },
};

export default resultPage;
