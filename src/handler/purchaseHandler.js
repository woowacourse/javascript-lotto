import { BonusInput, WinningInput } from "../components/WinningBonus.js";
import { LottoNumbers } from "../components/LottoNumbers.js";
import { Button } from "../components/Button.js";
import { Prompt } from "../components/Prompt.js";
import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants.js";
import { showResult } from "../step2-index.js";

export const purchaseHandler = (lottoCount, lottoArray) => {
  const countPrompt = `총 ${lottoCount}개를 구매했습니다.`;
  displayComponent(".count-prompt", Prompt(countPrompt));

  displayComponent(".lotto-numbers-container", LottoNumbers(lottoArray));

  const winningPrompt = `지난 주 당첨번호 ${LOTTO_NUMBERS.LENGTH}개와 보너스 번호 ${LOTTO_NUMBERS.BONUS_LENGTH}개를 입력해주세요.`;
  displayComponent(".winning-prompt", Prompt(winningPrompt));

  displayComponent(".winning-bonus-container", WinningInput(), BonusInput());

  displayComponent(
    ".result-button-container",
    Button("결과 확인하기", () => showResult(lottoCount, lottoArray))
  );
};

const displayComponent = (parentElement, ...childElement) => {
  childElement.forEach((element) => document.querySelector(`${parentElement}`).appendChild(element));
};
