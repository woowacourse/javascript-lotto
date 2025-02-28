import ERROR from "./constant/Error.js";
import WebMain from "./controller/WebMain.js";
import Validator from "./domain/Validator.js";
import { inputFormHandler } from "./util/inputFormHandler.js";
import Parser from "./util/Parser.js";
import WebOutput from "./view/WebOutput.js";

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

////////////////////////////
////////////////////////////
const getHTML = (e) => document.getElementById(e);

window.addEventListener("DOMContentLoaded", function () {
  // addEventListener 사용자가 esc 눌렀을 때.
  // if (getHTML("modalBackground").className === "show") {
  //   this.window.addEventListener("keydown", (event) => {
  //     if (event.key === "Escape") {
  //       getHTML("modalBackground").classList.remove("show");
  //     }
  //   });
  // }

  // 로고 클릭 시 초기화 Fhwlr로직
  getHTML("headerLogo").addEventListener("click", () => {
    location.reload();
  });
  ////////////////////////////
  ////////////////////////////
  // 구입 시 구입 금액 저장 - 1
  ////////////////////////////
  ///구입 금액 입력 시 에러핸들링
  getHTML("priceForm").addEventListener("input", (event) => {
    event.preventDefault();
    //event.target.value = event.target.value.replace(/[^0-9]/g, "");
    getHTML("priceErrorInfo").innerHTML = "";
    try {
      inputFormHandler({
        inputValue: event.target.value,
        parser: Parser.toNumber,
        validatorMethod: Validator.purchasePrice,
        errorName: ERROR.PURCHASE_PRICE,
      });
      getHTML("btnBuy").removeAttribute("disabled");
    } catch {
      getHTML("btnBuy").setAttribute("disabled", true);
      return;
    }
  });

  /// 구입 금액 제출 시 핸들링
  getHTML("priceForm").addEventListener("submit", (event) => {
    event.preventDefault();
    getHTML("priceErrorInfo").innerHTML = "";
    let purchasePrice;
    try {
      const priceData = new FormData(event.target);
      const inputPrice = priceData.get("price");
      purchasePrice = inputFormHandler({
        inputValue: inputPrice,
        parser: Parser.toNumber,
        validatorMethod: Validator.purchasePrice,
        errorName: ERROR.PURCHASE_PRICE,
      });
      getHTML("price").setAttribute("disabled", true);
      getHTML("btnBuy").setAttribute("disabled", true);
      WebMain.purchaseLotto(purchasePrice);
    } catch (error) {
      alert(error.message);
      return;
    }

    getHTML("resultContainer").classList.add("show");
    copyLottoNumber();
    ////////////////////////////
    ////////////////////////////
    ////////////////////////////
    // 당첨 번호 입력하기 - 2
    ////////////////////////////

    const winningInputs = document.querySelectorAll("#winningForm input");
    winningInputs.forEach((input, index, inputs) => {
      input.addEventListener("input", (event) => {
        let inputValue = event.target.value.replace(/[^0-9,]/g, "");
        const isBonusFocus = inputs[6] === document.activeElement;
        if (isBonusFocus) {
          getHTML(ERROR.WEB_WINNINGS_AND_BONUS.ELEMENT_ID).innerHTML = "";
          getHTML(ERROR.BONUS_NUMBER.ELEMENT_ID).innerHTML = "";
          const currentWinningNumbers = Array.from(
            document.querySelectorAll(".winning-number"),
          )
            .map((input) => input.value)
            .filter(Boolean);
          if (currentWinningNumbers.length !== 0) {
            const errorResults = Validator.winningsAndBonus(
              currentWinningNumbers,
              event.target.value,
            );
            WebOutput.printErrorResults(
              errorResults,
              ERROR.WEB_WINNINGS_AND_BONUS,
            );
          }
          try {
            inputFormHandler({
              inputValue: event.target.value,
              parser: Parser.toNumber,
              validatorMethod: Validator.bonusNumber,
              errorName: ERROR.BONUS_NUMBER,
            });
            //getHTML("btnBuy").removeAttribute("disabled");
          } catch {
            //getHTML("btnBuy").setAttribute("disabled", true);
            return;
          }
        }
        if (!isBonusFocus) {
          getHTML(ERROR.WINNING_NUMBERS.ELEMENT_ID).innerHTML = "";
          if (inputValue.length > 2 && !inputValue.includes(",")) {
            inputValue = inputValue.slice(0, 2);
          }
          if (inputValue.includes(",")) {
            const values = inputValue.split(",").filter(Boolean);
            event.target.value = values[0] || "";

            let nextIndex = index + 1;

            for (let i = 1; i < values.length; i++) {
              if (inputs[nextIndex]) {
                inputs[nextIndex].value = values[i];
                nextIndex++;
              }
            }

            if (inputs[nextIndex]) {
              inputs[nextIndex].focus();
            }
          } else {
            event.target.value = inputValue;
          }
          try {
            const currentWinningNumbers = Array.from(
              document.querySelectorAll(".winning-number"),
            )
              .map((input) => input.value)
              .filter(Boolean);
            inputFormHandler({
              inputValue: currentWinningNumbers,
              parser: Parser.toNumberArray,
              validatorMethod: Validator.webWinningNumbers,
              errorName: ERROR.WEB_WINNING_NUMBERS,
            });
          } catch {
            //getHTML("btnBuy").setAttribute("disabled", true);
            return;
          }
        }
      });
    });

    getHTML("winningForm").addEventListener("submit", (event) => {
      event.preventDefault();

      getHTML(ERROR.WEB_WINNINGS_AND_BONUS.ELEMENT_ID).innerHTML = "";
      getHTML(ERROR.WEB_WINNING_NUMBERS.ELEMENT_ID).innerHTML = "";
      getHTML(ERROR.BONUS_NUMBER.ELEMENT_ID).innerHTML = "";
      const winningData = new FormData(event.target);
      WebMain.defineWinningRules(winningData);
      openModal();
      this.window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          getHTML("modalBackground").classList.remove("show");
        }
      });

      WebMain.printLottoResult(purchasePrice);
    });
  });

  ////////////////////////////
  ////////////////////////////
  ////////////////////////////
  // 결과 확인하기 - 3
  ////////////////////////////
  // getHTML("openModalBtn").addEventListener("click", (event) => {
  //   event.preventDefault();
  //   openModal();
  //   WebMain.printLottoResult();
  // });
});
function openModal() {
  getHTML("modalBackground").innerHTML = `
  <div class="modal-box" id="modalBox">
      <div class="modal-content">
      <div class="close-modal-btn-box">
        <div class="close-modal-btn" id="closeModalBtn">
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
        <button id="restartBtn">다시 시작하기</button>
      </div>
    </div>
    `;

  getHTML("modalBackground").classList.add("show");
  getHTML("restartBtn").addEventListener("click", () => {
    location.reload();
  });
  getHTML("closeModalBtn").addEventListener("click", () => {
    getHTML("modalBackground").classList.remove("show");
  });
  getHTML("modalBackground").addEventListener("click", (e) => {
    if (e.target == e.currentTarget) {
      console.log("e.target", e.target);
      getHTML("modalBackground").classList.remove("show");
    }
  });
}

function copyLottoNumber() {
  document.querySelectorAll(".lotto-results-box li").forEach((li) => {
    li.addEventListener("click", () => {
      const textCopy = li.querySelector("p").textContent;
      navigator.clipboard
        .writeText(textCopy)
        .then(() => alert("해당 로또 번호가 복사되었습니다."))
        .catch(() => alert("로또 번호 복사에 실패하였습니다."));
    });
  });
}
