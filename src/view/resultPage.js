const eachInputLottoNumber = document.querySelectorAll(".eachInputLottoNumber");
const eachInputBonusNumber = document.querySelector(".eachInputBonusNumber");
const dialogElem = document.querySelector("dialog");
import { ControlElem } from "../utils/ControlElem";

const resultPage = {
  addEvent(resultCallback) {
    const restartButton = document.querySelector(".restartButton");
    const inputLottoBonusArea = document.querySelector(".inputLottoBonusArea");

    inputLottoBonusArea.addEventListener("submit", (event) => {
      event.preventDefault();
      resultCallback();
    });
    restartButton.addEventListener("click", this.clickRestart);
  },

  clickResult(result) {
    if (!result) return;

    dialogElem.showModal();
    this.showResult(result);
  },

  getLottoBonus() {
    const lotto = [];
    eachInputLottoNumber.forEach((eachInputLottoNumberElem) => {
      lotto.push(+eachInputLottoNumberElem.value);
      ControlElem.resetElem(eachInputLottoNumberElem, "value");
    });

    const bonus = +eachInputBonusNumber.value;
    ControlElem.resetElem(eachInputBonusNumber, "value");

    return [lotto, bonus];
  },

  showResult(result) {
    const winnerCount = document.querySelectorAll(".winnerCount");

    winnerCount.forEach((rank, index) => (rank.textContent = result[index]));
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
