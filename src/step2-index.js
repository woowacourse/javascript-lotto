/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO_NUMBER_SPLITER } from "./constants/constant";
import LottoMachine from "./domain/LottoMachine/LottoMachine";
import parseAndValidatePurchaseAmount from "./domain/processors/parseAndValidatePurchaseAmount";

const lotto_game = document.getElementById("lottoGame");
const purchase_amount_input = document.getElementById("purchaseAmount");
const purchase_button = document.getElementById("purchaseButton");

const lotto_pack_section = document.querySelector(".lotto_pack_section");
const purchase_count = document.querySelector(".purchase_count");
const lotto_pack = document.querySelector(".lotto_pack");

purchase_button.addEventListener("click", () => {
  try {
    const purchaseAmount = parseAndValidatePurchaseAmount(purchase_amount_input.value);
    const lottoPack = LottoMachine(purchaseAmount);

    purchase_count.textContent = `총 ${lottoPack.count}개를 구매했습니다.`;

    lottoPack.lottos.forEach((lotto) => {
      lotto_pack.innerHTML += `
            <div class="lotto">
                <img src="ticket.png" alt="로또" width="34px" height="36px" />
                <span>${lotto.lottoNumbers.join(LOTTO_NUMBER_SPLITER)}</span>
            </div>
              `;
    });

    lotto_pack_section.appendChild(purchase_count);
    lotto_pack_section.appendChild(lotto_pack);
  } catch (error) {
    alert(error);
  }
});
