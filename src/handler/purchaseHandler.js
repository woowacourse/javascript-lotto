import { BonusInput, WinningInput } from "../components/WinningBonus.js";
import { LottoNumbers } from "../components/LottoNumbers.js";
import { Button } from "../components/Button.js";
import { Prompt } from "../components/Prompt.js";
import { LOTTO_NUMBERS } from "../lottoConstants/systemConstants.js";
import { showResult } from "../step2-index.js";
import { displayComponent } from "../util/displayComponents.js";
import SYSTEM_MESSAGE from "../lottoConstants/systemMessage.js";
import { addKeyListener } from "../util/addKeyListener.js";

export const purchaseHandler = (lottoCount, lottoArray) => {
  displayComponent(".purchase-container", Prompt({ message: SYSTEM_MESSAGE.CANNOT_RETRY, style: "warning" }));

  const countPrompt = `총 ${lottoCount}개를 구매했습니다.`;
  displayComponent(".count-prompt", Prompt({ message: countPrompt }));

  displayComponent(".lotto-numbers-container", LottoNumbers({ lottoArray: lottoArray }));

  const winningPrompt = `지난 주 당첨번호 ${LOTTO_NUMBERS.LENGTH}개와 보너스 번호 ${LOTTO_NUMBERS.BONUS_LENGTH}개를 입력해주세요.
  로또 번호는 1에서 45까지 입력할 수 있습니다.`;
  displayComponent(".winning-prompt", Prompt({ message: winningPrompt }));

  displayComponent(".winning-bonus-container", WinningInput(), BonusInput());

  const resultButtonProps = { label: "결과 확인하기", onClick: () => showResult(lottoCount, lottoArray), style: "large", name: "result" };
  displayComponent(".result-button-container", Button(resultButtonProps));

  addKeyListener(
    "[name=winning-number], [name=bonus-number]",
    () => {
      showResult(lottoCount, lottoArray);
    },
    "Enter"
  );
};
