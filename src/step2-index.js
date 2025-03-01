/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { purchase } from "./LottoStore.js";
import { validatePurchaseAmount } from "./util/validate.js";

document.getElementById("button-purchase").addEventListener("click", async () => {
    await purchase();
});

document.getElementById("input-purchase-amount").addEventListener("input", (event) => {
    const inputValue = event.target.value;
    const button = document.getElementById("button-purchase");
    const helperText = document.getElementById("purchase-amount-helper-text");

    try {
        validatePurchaseAmount(inputValue);
        button.disabled = false;
        helperText.style.visibility = "hidden";
    } catch (error) {
        button.disabled = true;
        helperText.innerText = error.message.slice(8);
        helperText.style.visibility = "visible";
    }
});