/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import "../index.css";

const inputAmount = document.querySelector(".inputAmount");
const eachInputLottoNumber = document.querySelectorAll(".eachInputLottoNumber");
const eachInputBonusNumber = document.querySelector(".eachInputBonusNumber");

const purchase = document.querySelector(".purchase");
const restart = document.querySelector(".restart");
const result = document.querySelector(".result");

const count = document.querySelectorAll(".count");
const randomLottoList = document.querySelector(".randomLottoList");
const resultPage = document.querySelector(".resultPage");
const black = document.querySelector(".black");
const inputAmountNext = document.querySelector(".inputAmountNext");
const dialog = document.querySelector("dialog");

//

import Controller from "./Controller.js";

class App {
  constructor() {}
  play() {
    this.controller = new Controller();
    purchase.addEventListener("click", () => {
      const error = this.pushPurchase(inputAmount.value);
      inputAmount.value = "";
      if (error) return alert(error);
    });
  }

  pushPurchase(amount) {
    const randomLotteries = this.controller.inputPurchaseAmount(amount);
    if (typeof randomLotteries === "string") return randomLotteries;
    this.showRandomLottoAmount(randomLotteries);
    this.showRandomLottoList(randomLotteries);
    result.addEventListener("click", () => {
      const error = this.pushResult();
      if (error) return alert(error);
    });
  }

  showRandomLottoList(randomLotteries) {
    randomLottoList.innerHTML = "";
    randomLotteries.forEach((numbers) => {
      randomLottoList.appendChild(this.makeEachRandomLotto(numbers));
    });
    inputAmountNext.style.display = "block";
  }

  showRandomLottoAmount(randomLotteries) {
    document.querySelector(
      ".randomLottoAmount"
    ).textContent = `${randomLotteries.length}`;
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
  //위는 프린트 로또 아래는 로또 번호 불러오기
  pushResult() {
    const result = this.checkLottoBonus();
    if (typeof result === "string") return result;
    dialog.showModal();
    this.showResult(result);
    restart.addEventListener("click", () => {
      this.pushRestart();
    });
  }

  checkLottoBonus() {
    const lotto = [];
    const bonus = eachInputBonusNumber.value;
    eachInputBonusNumber.value = "";
    eachInputLottoNumber.forEach((numberElem) => {
      lotto.push(+numberElem.value);
      numberElem.value = "";
    });
    return this.controller.inputLottoBonus(lotto, +bonus);
  }

  showResult(result) {
    count.forEach((rank, index) => (rank.textContent = result[index]));
    document.querySelector(".rate").textContent = `${
      result[result.length - 1]
    }`;
  }

  pushRestart() {
    dialog.close();
    result.removeEventListener("click");
  }
}

const app = new App();
app.play();
