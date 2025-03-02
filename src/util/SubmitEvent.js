import ERROR from "../constant/Error";
import WebMain from "../controller/WebMain";
import Validator from "../domain/Validator";
import { inputFormHandler } from "./inputFormHandler";
import Parser from "./Parser";

const getHTML = (e) => document.getElementById(e);

function openModal() {
  getHTML("modalBackground").innerHTML = `
    <div class="modal-box" id="modalBox">
        <div class="modal-content">
        <div class="close-modal-btn-box">
          <div class="close-modal-btn" id="closeModalBtn" data-action="removeModal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/>
            </svg>
          </div>
        </div class="close-modal-btn-box">
          <h2>🏆 당첨 통계 🏆</h2>
          <table>
          <tr>
            <th class="modal-table-1th">일치 갯수</th>
            <th class="modal-table-2th">당첨금</th>
            <th class="modal-table-3th">당첨 갯수</th>
          </tr>
          <tr>
            <td>3개</td>
            <td>5,000</td>
            <td><span id="fifthRank"></span>개</td>
          </tr>
          <tr>
            <td>4개</td>
            <td>50,000</td>
            <td><span id="fourthRank"></span>개</td>
          </tr>
          <tr>
            <td>5개</td>
            <td>1,500,000</td>
            <td><span id="thirdRank"></span>개</td>
          </tr>
          <tr>
            <td>5개+보너스볼</td>
            <td>30,000,000</td>
            <td><span id="secondRank"></span>개</td>
          </tr>
          <tr>
            <td>6개</td>
            <td>2,000,000,000</td>
            <td><span id="firstRank"></span>개</td>
          </tr>
          </table>
  
          <p>당신의 <span id="winningRate"></span></p>
          <button id="restartBtn" data-action="reload">다시 시작하기</button>
        </div>
      </div>
      `;

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
    //let purchasePrice;

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

    getHTML(ERROR.WEB_WINNINGS_AND_BONUS.ELEMENT_ID).innerHTML = "";
    getHTML(ERROR.WEB_WINNING_NUMBERS.ELEMENT_ID).innerHTML = "";
    getHTML(ERROR.BONUS_NUMBER.ELEMENT_ID).innerHTML = "";
    const winningData = new FormData(form);
    WebMain.defineWinningRules(winningData);
    openModal();

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        getHTML("modalBackground").classList.remove("show");
      }
    });

    WebMain.printLottoResult(this.#purchasePrice);
  }

  onSubmit(event) {
    event.preventDefault();
    let form = event.target.closest("form");

    if (!form) return; // ✅ form 태그가 아닐 경우 무시

    if (form.id === "priceForm") {
      this.handlePriceSubmit(event, form);
    } else if (form.id === "winningForm") {
      this.handleWinningSubmit(event, form);
    }
  }
}

// ✅ 특정 컨테이너에서 이벤트 감지
new SubmitEvent(document);
