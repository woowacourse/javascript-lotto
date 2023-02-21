/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import "../index.css";
import Controller from "./Controller.js";

const inputAmount = document.querySelector(".inputAmount");
const eachInputLottoNumber = document.querySelectorAll(".eachInputLottoNumber");
const eachInputBonusNumber = document.querySelector(".eachInputBonusNumber");

const purchase = document.querySelector(".purchase");
const restart = document.querySelector(".restart");
const result = document.querySelector(".result");

const count = document.querySelectorAll(".count");
const randomLottoList = document.querySelector(".randomLottoList");
const inputAmountNext = document.querySelector(".inputAmountNext");
const dialog = document.querySelector("dialog");

class App {
  constructor() {}
  play() {
    this.controller = new Controller();
    this.addEvent();
  }

  addEvent() {
    purchase.addEventListener("click", this.handleAmountError.bind(this));
    inputAmount.addEventListener("keypress", (event) => {
      if (event.key === "Enter") this.handleAmountError();
    });
    result.addEventListener("click", this.handleLottoBonusError.bind(this));
    restart.addEventListener("click", this.clickRestart.bind(this));
  }

  handleAmountError() {
    console.log("d");
    const error = this.checkAmount(inputAmount.value);
    this.resetInputElement(inputAmount);
    if (error) return alert(error);
  }

  resetInputElement(element) {
    element.value = "";
  }

  //randomLotteries가 문자인 경우 에러메세지
  checkAmount(amount) {
    const randomLotteries = this.controller.amountTurnLotteries(amount);
    if (typeof randomLotteries === "string") return randomLotteries;

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
    randomLotteries.forEach((numbers) => {
      randomLottoList.appendChild(this.makeEachRandomLotto(numbers));
    });
    inputAmountNext.style.display = "block";
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

  handleLottoBonusError() {
    const error = this.clickResult();
    if (error) return alert(error);
  }

  clickResult() {
    const result = this.checkLottoBonus();
    if (typeof result === "string") return result;
    dialog.showModal();
    this.showResult(result);
  }

  checkLottoBonus() {
    const lotto = [];
    const bonus = eachInputBonusNumber.value;
    this.resetInputElement(eachInputBonusNumber);
    eachInputLottoNumber.forEach((numberElem) => {
      lotto.push(+numberElem.value);
      this.resetInputElement(numberElem);
    });

    console.log(lotto);
    return this.controller.inputLottoBonus(lotto, +bonus);
  }

  showResult(result) {
    count.forEach((rank, index) => (rank.textContent = result[index]));
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
