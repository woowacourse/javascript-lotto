import { ELEMENT_SELECTOR } from "../../constants/lotto";

export default class WinningResult {
  static #winningResultModal = document.getElementById(
    ELEMENT_SELECTOR.modalBackground,
  );

  static #winningContent = document.getElementById(
    ELEMENT_SELECTOR.winningResultContent,
  );

  static #returnRateContainer = document.getElementById(
    ELEMENT_SELECTOR.returnRateContainer,
  );

  static #renderResultModal() {
    WinningResult.#winningResultModal.classList.remove("hidden");
  }

  static #renderReturnRate(returnRate) {
    WinningResult.#returnRateContainer.innerHTML = `당신의 총 수익률은 ${returnRate}% 입니다.`;
  }

  static closeResultModal() {
    WinningResult.#winningResultModal.classList.add("hidden");
  }

  static renderWinningResult(winningResult, returRate) {
    const { first, second, third, fourth, fifth } = winningResult;
    WinningResult.#renderResultModal();
    WinningResult.#winningContent.innerHTML = `
    <thead>
        <tr class="text-m font-bold">
            <th>일치 갯수</td>
            <th>당첨금</td>
            <th>당첨 갯수</td>
        </tr>
    </thead>
    <tbody>
        <tr class="text-sm font-light">
            <td>${fifth.rule}개</td>
            <td>${fifth.reward.toLocaleString()}</td>
            <td>${fifth.matchedCount}개</td>
        </tr>
        <tr class="text-sm font-light">
            <td>${fourth.rule}개</td>
            <td>${fourth.reward.toLocaleString()}</td>
            <td>${fourth.matchedCount}개</td>
        </tr>
        <tr class="text-sm font-light">
            <td>${third.rule}개</td>
            <td>${third.reward.toLocaleString()}</td>
            <td>${third.matchedCount}개</td>
        </tr>
        <tr class="text-sm font-light">
            <td>${second.rule}개+보너스볼</td>
            <td>${second.reward.toLocaleString()}</td>
            <td>${second.matchedCount}개</td>
        </tr>
        <tr class="text-sm font-light">
            <td>${first.rule}개</td>
            <td>${first.reward.toLocaleString()}</td>
            <td>${first.matchedCount}개</td>
        </tr>
    </tbody>
    `;
    WinningResult.#renderReturnRate(returRate);
  }
}
