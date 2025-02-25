/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO_NUMBER_SPLITER } from "./constants/constant";
import LottoMachine from "./domain/LottoMachine/LottoMachine";
import parseAndValidateBonusNumber from "./domain/processors/parseAndValidateBonusNumber";
import parseAndValidatePurchaseAmount from "./domain/processors/parseAndValidatePurchaseAmount";
import parseAndValidateWinningNumbers from "./domain/processors/parseAndValidateWinningNumbers";

const lotto_game = document.getElementById("lottoGame");
const purchase_amount_input = lotto_game.querySelector("#purchaseAmount");
const purchase_button = lotto_game.querySelector("#purchaseButton");

const lotto_pack_section = lotto_game.querySelector(".lotto_pack_section");
const purchase_count = lotto_game.querySelector(".purchase_count");
const lotto_pack = lotto_game.querySelector(".lotto_pack");

const answer_lotto_section = lotto_game.querySelector(".answer_lotto_section");
const answer_lotto_title = answer_lotto_section.querySelector(".answer_lotto_title");

purchase_button.addEventListener("click", () => {
  try {
    const purchaseAmount = parseAndValidatePurchaseAmount(purchase_amount_input.value);
    const lottoPack = LottoMachine(purchaseAmount);

    purchase_count.textContent = `총 ${lottoPack.count}개를 구매했습니다.`;

    lottoPack.lottos.forEach((lotto) => {
      lotto_pack.innerHTML += `
            <div class="lotto">
                <img src="ticket.png" alt="로또" width="34px" height="36px" />
                <span>${lotto.lottoNumbers.join(`${LOTTO_NUMBER_SPLITER} `)}</span>
            </div>
              `;
    });
    lotto_pack_section.appendChild(purchase_count);
    lotto_pack_section.appendChild(lotto_pack);

    // 당첨번호+ 보너스 번호 호출

    // answer_lotto_section.classList.remove("opacity-0");
  } catch (error) {
    alert(error);
  }
});

const reuslt_button = lotto_game.querySelector(".reuslt_button_section #resultButton");

reuslt_button.addEventListener("click", () => {
  try {
    const winning_numbers = lotto_game.querySelectorAll(".winning_number");
    const bonus_number = lotto_game.querySelector(".bonus_number");

    const winningNumbersInput = [];
    winning_numbers.forEach((element) => {
      winningNumbersInput.push(element.value);
    });
    const bonusNumberInput = bonus_number.value;

    const { winningNumbers, bonusNumber } = answerLotto(winningNumbersInput, bonusNumberInput);
  } catch (error) {
    alert(error);
  }
});

const answerLotto = (winningNumbersInput, bonusNumberInput) => {
  const winningNumbers = parseAndValidateWinningNumbers(winningNumbersInput.join(LOTTO_NUMBER_SPLITER));
  const parseAndValidateBonusNumberFunc = parseAndValidateBonusNumber(winningNumbers);
  const bonusNumber = parseAndValidateBonusNumberFunc(bonusNumberInput);
  return { winningNumbers, bonusNumber };
};
