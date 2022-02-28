import lotto from '../../images/lotto.png';

export const lottoPurchaseCountTemplate = (count) => {
  return `
    총 ${count}개를 구매하였습니다.
  `;
};

export const lottoTemplate = (numbers) => {
  return `
    <div class="lotto-wrap">
      <img src=${lotto} />
      <p class="lotto-numbers hidden">${numbers.join(', ')}</p>
    </div>
  `;
};

export const lottoPurchaseResultTemplate = (lottoList) => {
  return `
    ${lottoList.map((lotto) => lottoTemplate([...lotto])).join('')}
  `;
};

export const lottoWinningNumberInputTemplate = () => {
  return `
    <section>
      <form>
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요</p>
        <div>
          <label for="lotto-winning-number">당첨 번호</label>
          <input id="lotto-winning-number" class="lotto-winning-number-container" type="number" />
          <input class="lotto-winning-number-container" type="number" />
          <input class="lotto-winning-number-container" type="number" />
          <input class="lotto-winning-number-container" type="number" />
          <input class="lotto-winning-number-container" type="number" />
          <input class="lotto-winning-number-container" type="number" />
        </div>
        <div>
          <label for="lotto-winning-bonus-number">보너스 번호</label>
          <input id="lotto-winning-bonus-number" class="lotto-winning-number-container" type="number" />
        </div>
        <button type="submit">결과 확인하기</button>
      </form>
    </section>
  `;
};
