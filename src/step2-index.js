/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import "../index.css";
import Controller from "./Controller.js";

const inputAmount = document.querySelector("#inputAmount");
const inputAmountNext = document.querySelector("#inputAmountNext");
const dialog = document.querySelector("dialog");
const randomLottoList = document.querySelector("#randomLottoList");

class App {
  play() {
    this.controller = new Controller();
    this.addEvent();
  }

  addEvent() {
    const purchase = document.querySelector(".purchase");
    const restartButton = document.querySelector(".restartButton");
    const resultButton = document.querySelector(".resultButton");

    purchase.addEventListener("click", this.checkAmount.bind(this));
    inputAmount.addEventListener("keypress", (event) => {
      if (event.key === "Enter") this.checkAmount();
    });
    resultButton.addEventListener("click", this.clickResult.bind(this));
    restartButton.addEventListener("click", this.clickRestart.bind(this));
  }

  checkAmount(amount) {
    const randomLotteries = this.controller.amountTurnLotteries(
      inputAmount.value
    );
    inputAmount.value = "";

    if (!randomLotteries) return;

    this.showRandomLottoAmount(randomLotteries);
    this.showRandomLottoList(randomLotteries);
  }

  showRandomLottoAmount(randomLotteries) {
    document.querySelector(
      ".randomLottoAmount"
    ).textContent = `${randomLotteries.length}`;
  }

  showRandomLottoList(randomLotteries) {
    randomLottoList.innerHTML = "";

    this.makeRandomLottoList(randomLotteries);

    inputAmountNext.style.display = "block";
  }

  makeRandomLottoList(randomLotteries) {
    const nodeRandomLotto = randomLotteries.map((numbers) =>
      this.makeEachRandomLotto(numbers)
    );
    randomLottoList.append(...nodeRandomLotto);
  }

  makeEachRandomLotto(numbers) {
    const rowElem = document.createElement("div");
    rowElem.appendChild(this.makeSpanElement("lottoImg", "🎟"));
    rowElem.appendChild(this.makeSpanElement("randomLottoNumbers", numbers));
    return rowElem;
  }

  makeSpanElement(className, text) {
    const elem = document.createElement("span");
    elem.classList.add(className);
    elem.textContent = text;
    return elem;
  }

  clickResult() {
    const result = this.checkLottoBonus();
    if (!result) return;

    dialog.showModal();
    this.showResult(result);
  }

  checkLottoBonus() {
    const eachInputLottoNumber = document.querySelectorAll(
      ".eachInputLottoNumber"
    );
    const eachInputBonusNumber = document.querySelector(
      ".eachInputBonusNumber"
    );

    const lotto = [];
    eachInputLottoNumber.forEach((numberElem) => {
      lotto.push(+numberElem.value);
      this.resetInputElement(numberElem);
    });

    const bonus = eachInputBonusNumber.value;
    this.resetInputElement(eachInputBonusNumber);

    return this.controller.inputLottoBonus(lotto, +bonus);
  }

  resetInputElement(element) {
    element.value = "";
  }

  showResult(result) {
    const winnerCount = document.querySelectorAll(".winnerCount");

    winnerCount.forEach((rank, index) => (rank.textContent = result[index]));
    document.querySelector(".rate").textContent = `${
      result[result.length - 1]
    }`;
  }

  clickRestart() {
    dialog.close();
    inputAmountNext.style.display = "none";
  }
}

const app = new App();
app.play();
