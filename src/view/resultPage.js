const eachInputLottoNumber = document.querySelectorAll(".eachInputLottoNumber");
const eachInputBonusNumber = document.querySelector(".eachInputBonusNumber");
const dialogElem = document.querySelector("dialog");

const resultPage = {
  addEvent(resultCallback) {
    // const resultButton = document.querySelector(".resultButton");
    const restartButton = document.querySelector(".restartButton");
    const inputLottoBonusArea = document.querySelector(".inputLottoBonusArea");

    inputLottoBonusArea.addEventListener("submit", (event) => {
      event.preventDefault();
      resultCallback();
    });
    // resultButton.addEventListener("click", resultCallback);
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
      this.resetInputElement(eachInputLottoNumberElem);
    });

    const bonus = +eachInputBonusNumber.value;
    this.resetInputElement(eachInputBonusNumber);

    return [lotto, bonus];
  },

  resetInputElement(element) {
    element.value = "";
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
