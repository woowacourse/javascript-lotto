import LOTTO from '../../constants/lotto';

const WinningInput = () => {
  return `
    <form class="winning-form" action="">
      <p>지난 주 당첨번호 ${LOTTO.SIZE}개와 보너스 번호 ${LOTTO.BONUS_SIZE}개를 입력해주세요.</p>
      <div class="winning-wrapper">
        <label>
          당첨 번호
          <div class="winning-number-wrapper">
            <input class="winning-number-input js-winning-number" type="text" maxLength="2"/>
            <input class="winning-number-input js-winning-number" type="text" maxLength="2"/>
            <input class="winning-number-input js-winning-number" type="text" maxLength="2"/>
            <input class="winning-number-input js-winning-number" type="text" maxLength="2"/>
            <input class="winning-number-input js-winning-number" type="text" maxLength="2"/>
            <input class="winning-number-input js-winning-number" type="text" maxLength="2"/>
          </div>
        </label>
        <label class="win-bonus">
          보너스 번호
          <input style="align-self: flex-end;" id="js-bonus-number" class="winning-number-input" type="text" maxLength="2"/>
        </label>
      </div>
      <button class="lotto-button submit-button caption" type="submit">결과 확인하기</button>
    </form>
  `;
};

export default WinningInput;
