import LOTTO from '../../constants/lotto';

const WinningInput = () => {
  return `
    <div class="winning-lotto">
      <span>지난 주 당첨번호 ${LOTTO.SIZE}개와 보너스 번호 ${LOTTO.BONUS_SIZE}개를 입력해주세요.</span>
        <div class="winning-wrapper">
          <div class="winning-lotto-numbers">
            <span>당첨 번호</span>
            <div class="winning-lotto-input">
              <input class="winning-lotto-number" type="text" maxLength="2"/>
              <input class="winning-lotto-number" type="text" maxLength="2"/>
              <input class="winning-lotto-number" type="text" maxLength="2"/>
              <input class="winning-lotto-number" type="text" maxLength="2"/>
              <input class="winning-lotto-number" type="text" maxLength="2"/>
              <input class="winning-lotto-number" type="text" maxLength="2"/>
            </div>
          </div>
          <div class="winning-bonus">
            <span>보너스 번호</span>
            <input id="bonus-number" class="winning-lotto-number" type="number" maxLength="2"/>
          </div>
        </div>
      </div>
    <button class="lotto-button submit-button caption">결과 확인하기</button>
  `;
};

export default WinningInput;
