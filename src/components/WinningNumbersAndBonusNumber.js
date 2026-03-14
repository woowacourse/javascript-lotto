import LottoRankCalculator from "../Lotto/LottoRankCalculator.js";
import LottoReturnCalculator from "../Lotto/LottoReturnCalculator.js";
import WinningNumbersAndBonusNumberBuilder from "../Lotto/WinningNumbersAndBonusNumberBuilder.js";
import registerHandler from "../service/registerHandler.js";
import render from "../service/render.js";
import LottoResult from "./LottoResult.js";

function WinningNumbersAndBonusNumber(lottos, purchaseAmount) {
  const disableForm = (form) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => (input.disabled = true));

    const button = form.querySelector("button");
    button.disabled = true;
  };

  registerHandler(".lotto-winning-bonus-number__form", "submit", (event) => {
    event.preventDefault();
    try {
      const form = new FormData(event.target);

      const builder = new WinningNumbersAndBonusNumberBuilder();
      builder.setWinningNumbers(form.getAll("winning-number").map(Number));
      builder.setBonusNumber(Number(form.get("bonus-number")));

      const { winningNumbers, bonusNumber } = builder.build();

      const rank = LottoRankCalculator.calculateLottoRanks({
        lottos,
        winningNumbers,
        bonusNumber,
      });

      const returnAmount = LottoReturnCalculator.calculateReturnAmount(rank);
      const returnRate = LottoReturnCalculator.calculateReturnRate(
        returnAmount,
        purchaseAmount,
      );

      disableForm(event.target);

      render(".lotto-result", LottoResult(rank, returnRate));
    } catch (error) {
      alert(error.message);
    }
  });

  return `
  <section>
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <form class="lotto-winning-bonus-number__form">
    <div class="lotto-winning-bonus-number__inputs">
      <div class="lotto-winning-bonus-number__winning">
        <label for="">당첨 번호</label>
        <div class="lotto-winning-bonus-number__winning-inputs">
          <input type="number" name="winning-number" min="1" max="45" class="lotto-winning-bonus-number__input" />
          <input type="number" name="winning-number" min="1" max="45" class="lotto-winning-bonus-number__input" />
          <input type="number" name="winning-number" min="1" max="45" class="lotto-winning-bonus-number__input" />
          <input type="number" name="winning-number" min="1" max="45" class="lotto-winning-bonus-number__input" />
          <input type="number" name="winning-number" min="1" max="45" class="lotto-winning-bonus-number__input" />
          <input type="number" name="winning-number" min="1" max="45" class="lotto-winning-bonus-number__input" />
        </div>
      </div>
      <div class="lotto-winning-bonus-number__bonus">
        <label for="">보너스 번호</label>
        <input type="number" name="bonus-number" min="1" max="45" class="lotto-winning-bonus-number__input" />
      </div>
      </div>
      <button class="lotto-winning-bonus-number__button">결과 확인하기</button>
    </form>
    </section>
  `;
}

export default WinningNumbersAndBonusNumber;
