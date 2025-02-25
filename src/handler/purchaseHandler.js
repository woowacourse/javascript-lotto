import { WinningBonusInput, WinningPrompt } from "../components/WinningBonus.js";
import { LottoCountPrompt } from "../components/LottoCount.js";
import { LottoNumbers } from "../components/LottoNumbers.js";
import { Button } from "../components/Button.js";

export const purchaseHandler = (lottoCount, lottoArray) => {
  const countPromptContainer = document.querySelector(".count-prompt");
  countPromptContainer.appendChild(LottoCountPrompt(lottoCount));

  const lottoContainer = document.querySelector(".lotto-numbers-container");
  lottoContainer.appendChild(LottoNumbers(lottoArray));

  WinningPrompt();
  WinningBonusInput();

  const ButtonContainer = document.querySelector(".result-button-container");
  ButtonContainer.appendChild(Button("결과 확인하기"));
};
