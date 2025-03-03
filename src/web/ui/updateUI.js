import { BonusInput, WinningInput } from "../components/WinningBonus.js";
import { LottoNumbers } from "../components/LottoNumbers.js";
import { Button } from "../components/Button.js";
import { Prompt } from "../components/Prompt.js";
import { LOTTO_NUMBERS } from "../../lottoConstants/systemConstants.js";
import SYSTEM_MESSAGE from "../../lottoConstants/systemMessage.js";
import { addKeyListener } from "../../util/addKeyListener.js";
import { Modal } from "../components/Modal.js";
import { Result } from "../components/Result.js";
import { appendToParent } from "../../util/appendToParent.js";
import { getState } from "../state/state.js";
import { disableElement } from "../../util/buttonActions.js";
import { resultHandler } from "../handler/resultHandler.js";

export const updatelottoCountUI = () => {
  const { lottoCount } = getState();
  if (lottoCount) {
    const countPrompt = `총 ${lottoCount}개를 구매했습니다.`;
    appendToParent(".count-prompt", Prompt({ message: countPrompt }));
    disableElement("purchase");
    disableElement("price");
    appendToParent(".purchase-container", Prompt({ message: SYSTEM_MESSAGE.CANNOT_RETRY, style: "warning" }));
    return;
  }
};

export const updateLottoArrayUI = () => {
  const { lottoArray } = getState();
  if (lottoArray) {
    appendToParent(".lotto-numbers-container", LottoNumbers({ lottoArray: lottoArray }));
  }
};

export const updateWinningBonusUI = () => {
  const winningPrompt = `지난 주 당첨번호 ${LOTTO_NUMBERS.LENGTH}개와 보너스 번호 ${LOTTO_NUMBERS.BONUS_LENGTH}개를 입력해주세요.
    로또 번호는 1에서 45까지 입력할 수 있습니다.`;
  appendToParent(".winning-prompt", Prompt({ message: winningPrompt }));

  appendToParent(".winning-bonus-container", WinningInput(), BonusInput());
};

export const updateResultButtonUI = () => {
  const resultButtonProps = { label: "결과 확인하기", onClick: () => resultHandler(), style: "large", name: "result" };
  appendToParent(".result-button-container", Button(resultButtonProps));
  addKeyListener(
    "[name=winning-number], [name=bonus-number]",
    () => {
      resultHandler();
    },
    "Enter"
  );
};

export const updateResultUI = () => {
  const { matchingCount, profitRate } = getState();
  if (matchingCount && profitRate) {
    const modalContent = Result({ matchingCount, profitRate });
    appendToParent("#app", Modal({ content: modalContent }));
  }
};
