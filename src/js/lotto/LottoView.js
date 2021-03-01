import { showElement, hideElement } from "../utils.js";
import { RANKINGS, PRIZE_TABLE } from "./constants/lotto_constants.js";
import {
  $confirmation,
  $lottoListLabel,
  $lottoTickets,
  $lottoNumbersToggleButton,
  $priceInput,
  $prizeTable,
  $earningRate,
  $winningNumberInputs,
  $bonusNumberInput,
  $purchaseForm,
  $lottoNumbersInput,
} from "../elements.js";

export default class LottoView {
  constructor() {}

  showPurchaseForm(numOfLottoes) {
    showElement($purchaseForm);
    $lottoNumbersInput.innerHTML = [...Array(numOfLottoes)]
      .map((_, index) => {
        return `
        <li class="mt-3 mb-4">
          ${`<input 
              type="number" 
              min="1" 
              max="45" 
              name="lotto-number-${index}"
              class="winning-number mx-1 text-center"
            />`.repeat(6)}
        </li>
      `;
      })
      .join("");
  }

  showTickets(num) {
    $lottoTickets.innerHTML = '<span class="mx-1 text-4xl">🎟️ </span>'.repeat(
      num
    );
  }

  showTicketDetails(lottoList) {
    $lottoTickets.innerHTML = `
      <div class="d-flex flex-col">
      ${lottoList
        .map(
          (lotto) => `
          <div class="d-flex flex-row items-center">
              <div class="d-felx items-center mx-1 text-4xl">🎟️ </div>
              <div class="ml-2 lotto-numbers">
                ${lotto.number.join(", ")}
              </div> 
          </div>`
        )
        .join("")}
      </div>`;
  }

  showConfirmation(lottoList) {
    showElement($confirmation);
    $lottoNumbersToggleButton.checked = false;
    $lottoListLabel.innerText = `총 ${lottoList.length}개를 구매하였습니다.`;
    this.showTickets(lottoList.length);
  }

  showPrizeTable(rankedCount) {
    $prizeTable.innerHTML = [5, 4, 3, 2, 1]
      .map((rankNum) => {
        const ranking = RANKINGS[`RANKING${rankNum}`];

        return `
          <tr class="text-center">
            <td class="p-3">${PRIZE_TABLE[ranking].condition}</td>
            <td class="p-3">${PRIZE_TABLE[ranking].prize}</td>
            <td class="p-3">${rankedCount[ranking]}개</td>
          </tr>
        `;
      })
      .join("");
  }

  showEarningRate(earningRate) {
    $earningRate.innerText = `당신의 총 수익률은 ${earningRate}%입니다.`;
  }

  resetPurchaseForm() {
    $priceInput.value = "";
    hideElement($purchaseForm);
  }

  resetLottoView() {
    $bonusNumberInput.value = "";
    $winningNumberInputs.forEach(($input) => ($input.value = ""));
    hideElement($confirmation);
  }
}
