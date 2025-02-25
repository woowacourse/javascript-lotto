/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import { LOTTO_NUMBER_SPLITER } from "./constants/constant";
import LottoMachine from "./domain/LottoMachine/LottoMachine";
import generateAnswerLotto from "./domain/generateAnswerLotto";
import parseAndValidateBonusNumber from "./domain/processors/parseAndValidateBonusNumber";
import parseAndValidatePurchaseAmount from "./domain/processors/parseAndValidatePurchaseAmount";
import parseAndValidateWinningNumbers from "./domain/processors/parseAndValidateWinningNumbers";
import profitCalculator from "./domain/profitCalculator/profitCalculator";

const lotto_game = document.getElementById("lottoGame");
const purchase_amount_input = lotto_game.querySelector("#purchaseAmount");
const purchase_button = lotto_game.querySelector("#purchaseButton");

const lotto_pack_section = lotto_game.querySelector(".lotto_pack_section");
const purchase_count = lotto_game.querySelector(".purchase_count");
const lotto_pack = lotto_game.querySelector(".lotto_pack");

const answer_lotto_section = lotto_game.querySelector(".answer_lotto_section");
const reuslt_button = lotto_game.querySelector(".reuslt_button_section #resultButton");

const lotto_result_modal = document.querySelector(".lotto_result_modal");
// const close_modal = lotto_result_modal.querySelector(".close");
const lotto_result = document.getElementById("lottoResult");
const statistics = lotto_result.querySelector(".statistics");
const statistics_rows = statistics.querySelectorAll(".row");
const profit_rate = lotto_result.querySelector(".profit_rate");

const restart_button = lotto_result.querySelector(".restart_button");

let purchaseAmount = null;
let lottoPack = null;

purchase_amount_input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    purchase_button.click();
    purchase_amount_input.blur();
  }
});

purchase_button.addEventListener("click", () => {
  try {
    purchaseAmount = parseAndValidatePurchaseAmount(purchase_amount_input.value);
    lottoPack = LottoMachine(purchaseAmount);

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

    answer_lotto_section.classList.remove("opacity-0");
    reuslt_button.classList.remove("opacity-0");
  } catch (error) {
    alert(error);
  }
});

reuslt_button.addEventListener("click", () => {
  try {
    const winning_numbers = lotto_game.querySelectorAll(".winning_number");
    const bonus_number = lotto_game.querySelector(".bonus_number");

    const winningNumbersInput = [];
    winning_numbers.forEach((element) => {
      winningNumbersInput.push(element.value);
    });
    const bonusNumberInput = bonus_number.value;

    const { winningNumbers, bonusNumber } = answerLottoInput(winningNumbersInput, bonusNumberInput);

    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

    const winningResult = lottoPack.compareAndReturnResult(answerLotto);
    statistics_rows.forEach((row) => {
      const price = row.querySelector(".price").textContent;
      const matchedKey = Object.keys(winningResult).find((key) => key.includes(price));
      if (matchedKey) {
        row.querySelector(".user_count").textContent = `${winningResult[matchedKey]}개`;
      }
    });

    const profitRate = profitCalculator(purchaseAmount, winningResult);
    profit_rate.textContent = `당신의 총 수익률은 ${profitRate}%입니다.`;

    lotto_result_modal.showModal();
  } catch (error) {
    alert(error);
  }
});

const answerLottoInput = (winningNumbersInput, bonusNumberInput) => {
  const winningNumbers = parseAndValidateWinningNumbers(winningNumbersInput.join(LOTTO_NUMBER_SPLITER));
  const parseAndValidateBonusNumberFunc = parseAndValidateBonusNumber(winningNumbers);
  const bonusNumber = parseAndValidateBonusNumberFunc(bonusNumberInput);
  return { winningNumbers, bonusNumber };
};

lotto_result_modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) lotto_result_modal.close();
});

restart_button.addEventListener("click", () => {
  lotto_result_modal.close();
  purchase_amount_input.value = "";
  purchase_count.textContent = "";
  lotto_pack.replaceChildren();

  answer_lotto_section.classList.add("opacity-0");
  reuslt_button.classList.add("opacity-0");

  const winning_numbers = lotto_game.querySelectorAll(".winning_number");
  const bonus_number = lotto_game.querySelector(".bonus_number");

  winning_numbers.forEach((element) => {
    element.value = "";
  });
  bonus_number.value = "";
});
