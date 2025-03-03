import { BonusInput, WinningInput } from "../components/WinningBonus.js";
import { LottoNumbers } from "../components/LottoNumbers.js";
import { Button } from "../components/Button.js";
import { Prompt } from "../components/Prompt.js";
import { Modal } from "../components/Modal.js";
import { Result } from "../components/Result.js";
import { getPrevState, getState } from "../state/state.js";
import SYSTEM_MESSAGE from "../../common/lottoConstants/systemMessage.js";
import { LOTTO_NUMBERS } from "../../common/lottoConstants/systemConstants.js";
import { appendElement } from "../util/elementManager.js";
import { disableElement } from "../util/buttonActions.js";
import { ResultController } from "../controller/ResultController.js";
import { WinningController } from "../controller/WinningController.js";
import { addKeyListener } from "../util/addKeyListener.js";

export const updateUI = () => {
  const state = getState();
  const prevState = getPrevState();

  if (state.lottoCount !== prevState.lottoCount || state.lottoArray !== prevState.lottoArray) {
    updatelottoCountUI();
    updateLottoArrayUI();
    updateWinningBonusUI();
    updateResultButtonUI();
  }
  if (state.matchingCount !== prevState.matchingCount || state.profitRate !== prevState.profitRate) {
    updateResultUI();
  }
};

const updatelottoCountUI = () => {
  const { lottoCount } = getState();

  const countPrompt = `총 ${lottoCount}개를 구매했습니다.`;
  appendElement(".count-prompt", Prompt({ message: countPrompt }));
  disableElement("purchase");
  disableElement("price");
  appendElement(".purchase-container", Prompt({ message: SYSTEM_MESSAGE.CANNOT_RETRY, style: "warning" }));
};

const updateLottoArrayUI = () => {
  const { lottoArray } = getState();

  appendElement(".lotto-numbers-container", LottoNumbers({ lottoArray: lottoArray }));
};

const updateWinningBonusUI = () => {
  const winningPrompt = `지난 주 당첨번호 ${LOTTO_NUMBERS.LENGTH}개와 보너스 번호 ${LOTTO_NUMBERS.BONUS_LENGTH}개를 입력해주세요.
    로또 번호는 1에서 45까지 입력할 수 있습니다.`;
  appendElement(".winning-prompt", Prompt({ message: winningPrompt }));

  appendElement(".winning-bonus-container", WinningInput(), BonusInput());
};

const updateResultButtonUI = () => {
  const resultClickHandler = () => {
    WinningController();
    ResultController();
  };
  const resultButtonProps = { label: "결과 확인하기", onClick: resultClickHandler, style: "large", name: "result" };
  addKeyListener("[name=winning-number],[name=bonus-number]", resultClickHandler, "Enter");
  appendElement(".result-button-container", Button(resultButtonProps));
};

const updateResultUI = () => {
  const { matchingCount, profitRate } = getState();

  const modalContent = Result({ matchingCount, profitRate });
  appendElement("#app", Modal({ content: modalContent }));
};
