import { LOTTO } from "../constants/lotto.js";
import { $ } from '../utils/selector.js';
import makeRankContent from './makeRankContent.js';
import renderTable from './renderTable.js';

const $purchasedContainer = document.getElementById("purchasedContainer");
const $purchasedLottoCount = document.getElementById("purchasedLottoCount");
const $purchasedLottosContainer = document.getElementById("purchasedLottosContainer");

const $winningLottoAndBonusInputForm = document.getElementById("winningLottoAndBonusInputForm");
const $winningLottoAndBonusInputTitle = document.getElementById("winningLottoAndBonusInputTitle");
const $winningLottoInputContainer = document.getElementById("winningLottoInputContainer");
const $bonusInputContainer = document.getElementById("bonusInputContainer");

const view = {
  printRandomLottos(randomLottos) {
    $purchasedContainer.style.display = "block";

    $purchasedLottoCount.innerText = `총 ${randomLottos.length}개를 구매하였습니다.`;

    $purchasedLottosContainer.innerHTML = randomLottos.map((lotto) => `<li><span class="emojiText">🎟️</span> ${lotto.join(", ")}</li>`).join("\n");
  },

  printWinningLottoAndBonusInputForm() {
    $winningLottoAndBonusInputForm.style.display = "block";
    $winningLottoAndBonusInputTitle.innerText = `지난 주 당첨번호 ${LOTTO.count}개와 보너스 번호 ${LOTTO.bonusCount}개를 입력해주세요.`;

    const winningLottoInputs = new Array(LOTTO.count).fill().map((_, i) => `<input class='squareInput' id='winningLotto-${i+1}' type='text'>`);

    $winningLottoInputContainer.innerHTML = `<div class="marginBottomSmall">당첨 번호</div> <div class="inputsGap">${winningLottoInputs.join("")}</div>`;
    $bonusInputContainer.innerHTML = `<div class="marginBottomSmall">보너스 번호</div><input class='squareInput' id='bonusInput' type='text'/>`;
  },

  printRank(ranks) {
    const rankTable = [['일치 갯수', '당첨금', '당첨 갯수']];
    const rankTableContent = ranks.map((rank, i) => makeRankContent(rank, i));
    
    rankTableContent.forEach(content => rankTable.push(content))
    renderTable('resultTable', rankTable);
  },

  printProfitRate(profitRate) {
    const $profitRate = $('profitRate');

    $profitRate.innerText = `당신의 총 수익률은 ${profitRate}%입니다.`
  },

  clearForm() {
    $('moneyInputForm').reset();
    $winningLottoAndBonusInputForm.reset();
  },

  removeRandomLottosAndWinningForm() {
    // TODO: 아예 제거하면 이벤트 리스너도 초기화 되던데 방법이 없나?
    $purchasedContainer.style.display = 'none'
    $winningLottoAndBonusInputForm.style.display = 'none'
  }
};

export default view;
