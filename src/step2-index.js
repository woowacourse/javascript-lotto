/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO_NUMBER_SPLITER } from "./constants/constant";
import LottoMachine from "./domain/LottoMachine/LottoMachine";
import parseAndValidatePurchaseAmount from "./domain/processors/parseAndValidatePurchaseAmount";

const lottoGame = document.getElementById("lottoGame");

const purchaseAmountInput = document.getElementById("purchaseAmount");
const purchaseButton = document.getElementById("purchaseButton");

purchaseButton.addEventListener("click", () => {
  try {
    const purchaseAmount = parseAndValidatePurchaseAmount(purchaseAmountInput.value);
    const lottoPack = LottoMachine(purchaseAmount);

    const purchaseCount = document.createElement("span");
    purchaseCount.innerText = `총 ${lottoPack.count}개를 구매했습니다.`;
    const lottoSet = document.createElement("div");
    lottoSet.classList.add("lottoSet");
    lottoPack.lottos.forEach((lotto) => {
      const lottoNumber = document.createElement("span");
      lottoNumber.innerText = `${lotto.lottoNumbers.join(LOTTO_NUMBER_SPLITER)}`;
      lottoSet.appendChild(lottoNumber);
    });
    lottoGame.appendChild(purchaseCount);
    lottoGame.appendChild(lottoSet);
  } catch (error) {
    alert(error);
  }
});
