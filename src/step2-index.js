/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO } from "./constants";
import Validator from "./Validator";
import WebView from "./View/WebView";

const purchaseForm = document.querySelector(".purchase-form");
const purchaseInput = document.querySelector(".purchase-form__input");

function validateMoney(money) {
  Validator.numberDivided(money, LOTTO.PRICE);
  Validator.positiveNumber(money);
}

// 이벤트 달기
purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 폼 새로고침 방지
  try {
    const money = WebView.readMoney();
    validateMoney(money);

    console.log();
    alert(money);
  } catch (error) {
    alert(error.message);
    purchaseInput.focus();
  } finally {
    purchaseInput.value = "";
  }
});
