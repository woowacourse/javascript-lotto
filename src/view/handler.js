import { LOTTO } from "../constants/lotto.js";
import { $ } from "../utils/selector.js";

const $moneyInputForm = document.getElementById("moneyInputForm");
const $moneyInput = document.getElementById("moneyInput");

const $winningLottoAndBonusInputForm = document.getElementById("winningLottoAndBonusInputForm");

const $checkResult = document.getElementById("checkResult");

const handler = {
  headerResize() {
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      const { scrollY } = window;

      if (scrollY > 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    });
  },

  getMoney(handleMoney) {
    this.onlyNumberInput("moneyInput");
    $moneyInputForm.addEventListener("submit", (event) => {
      event.preventDefault(); // submit시 새로고침 방지
      handleMoney($moneyInput.value);
    });
  },

  getWinningLottoAndBonus(handleWinningLottoAndBonus) {
    $winningLottoAndBonusInputForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const $winningLottos = new Array(LOTTO.count)
        .fill()
        .map((_, i) => document.getElementById(`winningLotto-${i + 1}`));
      const winningLottos = Array.from($winningLottos)
        .map((winningLotto) => winningLotto.value)
        .join(","); // 불필요하게 join으로 연결해주고 있다.

      const bonusNumber = document.getElementById("bonusInput").value;

      handleWinningLottoAndBonus(winningLottos, bonusNumber);
    });
  },

  getRank(handleRank) {
    $checkResult.addEventListener("submit", (event) => {
      event.preventDefault();
      handleRank();
    });
  },

  restart(handleRestart) {
    $("restartButton").addEventListener("click", (event) => {
      handleRestart();
    });
  },

  onlyNumberInput(inputId) {
    const $input = $(inputId);
    const regex = /^[0-9]*$/;

    if (!regex.test($input.value)) {
      $input.innerHTML += "숫자만 입력해주세요";
      $input.value = $input.value.replace(/[^\d]/g, "");
    }
  },
};

export default handler;
