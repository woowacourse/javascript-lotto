/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const inputAmount = document.querySelector(".inputAmount");
const eachInputLottoNumber = document.querySelectorAll(".eachInputLottoNumber");
const eachInputBonusNumber = document.querySelector(".eachInputBonusNumber");

const purchase = document.querySelector(".purchase");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");

const count = document.querySelectorAll(".count");
const randomLottoList = document.querySelector(".randomLottoList");
const resultPage = document.querySelector(".resultPage");
const black = document.querySelector(".black");
const inputAmountNext = document.querySelector(".inputAmountNext");
const dialog = document.querySelector("dialog");

// dialog.showModal();

// black.style.display = "block";
// resultPage.style.display = "block";

import Controller from "./Controller.js";

class App {
  constructor() {}
  play() {
    this.controller = new Controller();
    purchase.addEventListener("click", () => {
      const error = this.pushPurchase(inputAmount.value);
      if (error) return alert(error);
    });
  }

  pushPurchase(amount) {
    inputAmount.value = "";
    const randomLotteries = this.controller.inputPurchaseAmount(amount);
    if (typeof randomLotteries === "string") return randomLotteries;
    document.querySelector(
      ".randomLottoAmount"
    ).textContent = `${randomLotteries.length}`;
    this.showRandomLottoList(randomLotteries);
  }

  showRandomLottoList(randomLotteries) {
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
}

const app = new App();
app.play();
