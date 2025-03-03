import Controller from "./controllers/Controller.js";
import Output from "./views/Output.js";
import issueLottos from "./domains/issueLottos.js";

document.addEventListener("DOMContentLoaded", () => {
  const purchaseInput = document.querySelector("#purchase-amount");
  const purchaseButton = document.querySelector("#purchase-btn");
  const lottoListContainer = document.querySelector("#lotto-list");
  const winningSection = document.querySelector(".get-numbers");
  const checkResultButton = document.querySelector("#check-result-btn");
  const controller = new Controller();

  if (!checkResultButton) {
    console.error("❌ checkResultButton을 찾을 수 없습니다!");
    return;
  }

  checkResultButton.style.display = "block";

  purchaseButton.addEventListener("click", () => {
    const inputAmount = purchaseInput.value.trim();
    let purchaseAmount;

    try {
      purchaseAmount = Number(inputAmount);
      if (
        isNaN(purchaseAmount) ||
        purchaseAmount < 1000 ||
        purchaseAmount % 1000 !== 0
      ) {
        throw new Error("구입 금액은 1,000원 단위여야 합니다.");
      }
    } catch (error) {
      Output.printError(error.message);
      purchaseInput.value = "";
      return;
    }

    const lottos = issueLottos(purchaseAmount);
    displayLottos(lottos);

    winningSection.style.display = "block";
    checkResultButton.style.display = "block";

    controller.purchaseAmount = purchaseAmount;
    controller.lottos = lottos;

    purchaseInput.value = "";
  });

  checkResultButton.addEventListener("click", async () => {
    const { winningNumbers, bonusNumber } = getWinningNumbers();

    if (!winningNumbers || bonusNumber === null) {
      console.warn("⚠️ 당첨 번호 입력이 올바르지 않음!");
      return;
    }

    const winningStatistics = await controller.start(
      winningNumbers,
      bonusNumber
    );

    if (!winningStatistics) {
      console.error("❌ winningStatistics가 생성되지 않음! 모달 표시 불가");
      return;
    }

    Output.displayWinningStatistics(winningStatistics); // ✅ 수정된 부분
  });

  function displayLottos(lottos) {
    lottoListContainer.innerHTML = `
      <p>총 ${lottos.length}개를 구매하였습니다.</p>
      <ul class="text-body">
        ${lottos.map((lotto) => `<li>🎟️ ${lotto.join(", ")}</li>`).join("")}
      </ul>
    `;
  }

  function getWinningNumbers() {
    const winningInputs = document.querySelectorAll(".winning-number");
    const bonusInput = document.querySelector(".bonus-number input");

    if (!winningInputs.length || !bonusInput) {
      Output.printError(
        "당첨 번호 또는 보너스 번호 입력 필드를 찾을 수 없습니다."
      );
      return { winningNumbers: null, bonusNumber: null };
    }

    const winningNumbers = [...winningInputs]
      .map((input) => input?.value?.trim() ?? "")
      .filter((val) => val !== "")
      .map(Number)
      .filter((num) => !isNaN(num) && num >= 1 && num <= 45);

    let bonusNumber = Number(bonusInput.value.trim());

    if (
      winningNumbers.length !== 6 ||
      isNaN(bonusNumber) ||
      bonusNumber < 1 ||
      bonusNumber > 45
    ) {
      Output.printError(
        "올바른 형식으로 당첨 번호와 보너스 번호를 입력해주세요."
      );
      return { winningNumbers: null, bonusNumber: null };
    }

    if (winningNumbers.includes(bonusNumber)) {
      Output.printError("보너스 번호는 당첨 번호와 중복될 수 없습니다.");
      return { winningNumbers: null, bonusNumber: null };
    }

    return { winningNumbers, bonusNumber };
  }
});
