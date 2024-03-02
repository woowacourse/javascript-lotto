import { LOTTO } from "../../constants/lotto.js";
import { $ } from "../../utils/web/selector.js";

const inputView = {
  // TODO: trigger, target 이름 수정
  async readMoney() {
    const $trigger = $("#moneySubmit");
    const $target = $("#moneyInput");

    return new Promise((resolve) => {
      $trigger.addEventListener("click", async (event) => {
        event.preventDefault();
        resolve($target.value);
      });
    });
  },

  async readWinningLottoNumbersAndBonus() {
    const $trigger = $("#checkResult");

    return new Promise((resolve) => {
      $trigger.addEventListener("click", async (event) => {
        event.preventDefault();
        const winningLotto = new Array(LOTTO.count).fill().map((_, i) => $(`#winningLotto-${i + 1}`).value);
        const bonusNumber = $("#bonusInput").value;

        // TODO: 놓친 번호들 에러 처리
        resolve([winningLotto.join(","), bonusNumber]);
      });
    });
  },

  restart(handleRestart) {
    const $trigger = $("#restartButton");

    $trigger.addEventListener("click", (event) => {
      event.preventDefault();

      handleRestart();
    });
  },
};

export default inputView;
