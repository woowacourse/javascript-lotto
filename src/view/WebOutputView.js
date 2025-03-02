import { BonusInput, WinningInput } from "../components/WinningBonus.js";
import { LottoNumbers } from "../components/LottoNumbers.js";
import { Button } from "../components/Button.js";
import { Prompt } from "../components/Prompt.js";
import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants.js";
import SYSTEM_MESSAGE from "../lottoConstants/systemMessage.js";
import { addKeyListener } from "../util/addKeyListener.js";
import { Modal } from "../components/Modal.js";
import { Result } from "../components/Result.js";
import { resultHandler } from "../handler/resultHandler.js";
import { appendToParent } from "../util/appendToParent.js";

export const WebOutputView = {
  renderLottoFlow(lottoCount, lottoArray) {
    appendToParent(".purchase-container", Prompt({ message: SYSTEM_MESSAGE.CANNOT_RETRY, style: "warning" }));

    const countPrompt = `총 ${lottoCount}개를 구매했습니다.`;
    appendToParent(".count-prompt", Prompt({ message: countPrompt }));

    appendToParent(".lotto-numbers-container", LottoNumbers({ lottoArray: lottoArray }));

    const winningPrompt = `지난 주 당첨번호 ${LOTTO_NUMBERS.LENGTH}개와 보너스 번호 ${LOTTO_NUMBERS.BONUS_LENGTH}개를 입력해주세요.
  로또 번호는 1에서 45까지 입력할 수 있습니다.`;
    appendToParent(".winning-prompt", Prompt({ message: winningPrompt }));

    appendToParent(".winning-bonus-container", WinningInput(), BonusInput());

    const resultButtonProps = { label: "결과 확인하기", onClick: () => resultHandler(lottoCount, lottoArray), style: "large", name: "result" };
    appendToParent(".result-button-container", Button(resultButtonProps));

    addKeyListener(
      "[name=winning-number], [name=bonus-number]",
      () => {
        resultHandler(lottoCount, lottoArray);
      },
      "Enter"
    );
  },
  renderResult(matchingCount, profitRate) {
    const modalContent = Result({ matchingCount, profitRate });
    appendToParent("#app", Modal({ content: modalContent }));
  },
};

export default WebOutputView;
