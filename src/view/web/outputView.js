import { LOTTO } from "../../constants/lotto.js";
import { $ } from "../../utils/web/selector.js";
import makeRankContent from "./makeRankContent.js";
import renderTable from "../renderTable.js";

const outputView = {
  printRandomLottos(randomLottos) {
    $("#purchasedContainer").style.display = "block";

    $("#purchasedLottoCount").innerText = `총 ${randomLottos.length}개를 구매하였습니다.`;

    $("#purchasedLottosContainer").innerHTML = randomLottos
      .map((lotto) => `<li><span class="emojiText">🎟️</span> ${lotto.join(", ")}</li>`)
      .join("\n");
  },

  // TODO: 리팩터링 필요
  printWinningLottoAndBonusInputForm() {
    $("#winningLottoAndBonusInputContainer").style.display = "block";
    $(
      "#winningLottoAndBonusInputTitle"
    ).innerText = `지난 주 당첨번호 ${LOTTO.count}개와 보너스 번호 ${LOTTO.bonusCount}개를 입력해주세요.`;

    const winningLottoInputs = new Array(LOTTO.count)
      .fill()
      .map((_, i) => `<input class='squareInput' id='winningLotto-${i + 1}' type='text'>`);

    $(
      "#winningLottoInputForm"
    ).innerHTML = `<div class="marginBottomSmall">당첨 번호</div> <div class="inputsGap">${winningLottoInputs.join(
      ""
    )}</div>`;
    $(
      "#bonusInputForm"
    ).innerHTML = `<div class="marginBottomSmall">보너스 번호</div><input class='squareInput' id='bonusInput' type='text'/>`;
  },

  printRanks(ranks) {
    const rankTable = [["일치 갯수", "당첨금", "당첨 갯수"]];
    const rankTableContent = ranks.map((rank, i) => makeRankContent(rank, i));

    rankTableContent.forEach((content) => rankTable.push(content));
    renderTable("#resultTable", rankTable);
  },

  printProfitRate(profitRate) {
    $("#profitRate").innerText = `당신의 총 수익률은 ${profitRate}%입니다.`;
  },

  resetToStart() {
    this.usableMoneyInput();
    // TODO: 모든 폼을 가져와서 리셋하도록 수정
    // 동적으로 추가한 돔, 원래 있던 돔 | 돔을 삭제하느냐, 아예 폼을 리셋하느냐
    $("#moneyInputForm").reset();
    $("#purchasedContainer").style.display = "none";
    $("#winningLottoAndBonusInputContainer").style.display = "none";

    const $checkResult = $("#checkResult");
    $checkResult.classList.remove("disabledButton");
    $checkResult.disabled = false;
  },

  removeRandomLottosAndWinningForm() {
    // TODO: 아예 제거하면 이벤트 리스너도 초기화 되던데 방법이 없나?
    $("#purchasedContainer").style.display = "none";
    $("#winningLottoAndBonusInputForm").style.display = "none";
  },

  blockMoneyInput() {
    const $moneyInput = $("#moneyInput");
    const $moneySubmit = $("#moneySubmit");

    $moneyInput.classList.add("disabledInput");
    $moneySubmit.classList.add("disabledButton");

    $moneyInput.disabled = true;
    $moneySubmit.disabled = true;
  },

  usableMoneyInput() {
    const $moneyInput = $("#moneyInput");
    const $moneySubmit = $("#moneySubmit");

    $moneyInput.classList.remove("disabledInput");
    $moneySubmit.classList.remove("disabledButton");

    $moneyInput.disabled = false;
    $moneySubmit.disabled = false;
  },

  blockWinningLottoAndBonusInput() {
    const $winningLottoInputs = new Array(LOTTO.count).fill().map((_, i) => $(`#winningLotto-${i + 1}`));
    const $bonusNumberInput = $("#bonusInput");
    const $checkResult = $("#checkResult");

    $winningLottoInputs.forEach(($input) => {
      $input.classList.add("disabledInput");
      $input.disabled = true;
    });

    $bonusNumberInput.classList.add("disabledInput");
    $bonusNumberInput.disabled = true;

    $checkResult.classList.add("disabledButton");
    $checkResult.disabled = true;
  },
};

export default outputView;
