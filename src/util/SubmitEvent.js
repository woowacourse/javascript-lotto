import ERROR from "../constant/Error.js";
import WebMain from "../controller/WebMain.js";
import Validator from "../domain/Validator.js";
import { inputFormHandler } from "./inputFormHandler.js";
import Parser from "./Parser.js";

const getHTML = (e) => document.getElementById(e);

function openModal() {
  const modalBackground = getHTML("modalBackground");
  if (modalBackground.querySelector(".modal-box")) {
    modalBackground.classList.add("show");
    return;
  }
  const modalClone = getHTML("modalTemplate").content.cloneNode(true);
  getHTML("modalBackground").appendChild(modalClone);
  getHTML("modalBackground").classList.add("show");
}

class SubmitEvent {
  #purchasePrice;
  constructor(elem) {
    elem.addEventListener("submit", this.onSubmit.bind(this));
  }

  handlePriceSubmit(event, form) {
    event.preventDefault();
    getHTML("priceErrorInfo").innerHTML = "";

    try {
      const priceData = new FormData(form);
      const inputPrice = priceData.get("price");
      this.#purchasePrice = inputFormHandler({
        inputValue: inputPrice,
        parser: Parser.toNumber,
        validatorMethod: Validator.purchasePrice,
        errorName: ERROR.PURCHASE_PRICE,
      });
      getHTML("price").setAttribute("disabled", true);
      getHTML("btnBuy").setAttribute("disabled", true);
      WebMain.purchaseLotto(this.#purchasePrice);
    } catch (error) {
      alert(error.message);
      return;
    }

    getHTML("resultContainer").classList.add("show");
  }

  handleWinningSubmit(event, form) {
    event.preventDefault();
    try {
    const winningData = new FormData(form);
    WebMain.defineWinningRules(winningData);

    openModal();

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        getHTML("modalBackground").classList.remove("show");
      }
    });

    WebMain.printLottoResult(this.#purchasePrice);
    } catch {
        alert("유효하지 않은 값이 있습니다. 안내 문구를 다시 확인해주세요.");
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let form = event.target.closest("form");

    if (!form) return;

    if (form.id === "priceForm") {
      this.handlePriceSubmit(event, form);
    } else if (form.id === "winningForm") {
      this.handleWinningSubmit(event, form);
    }
  }
}

new SubmitEvent(document);
