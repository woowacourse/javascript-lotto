import lotto from '../../images/lotto.png';

export const lottoPurchaseCountTemplate = (count) => {
  return `
    총 ${count}개를 구매하였습니다.
  `;
};

export const lottoPurchaseResultTemplate = (lottoList) => {
  return `
    ${lottoList.map((lotto) => lottoTemplate([...lotto])).join('')}
  `;
};

export const toggleButtonTemplate = () => {
  return `
    <div id="lotto-toggle-button" class="flex flex-direction-column">
      <p>번호보기</p>
      <label class="switch" for="show-lotto-toggle">
      <input
        id="show-lotto-toggle"
        name="show-lotto-toggle"
        type="checkbox"
      />
      <span class="slider round"></span>
      </label>
    </div>
  `;
};

export const lottoTemplate = (numbers) => {
  return `
    <li class="flex">
      <img src=${lotto} />
      <p class="lotto-numbers hidden">${numbers.join(', ')}</p>
    </li>
  `;
};

export const lottoWinningNumberInputTemplate = () => {
  return `
    <section id="lotto-winning-number-input-section">
      <form id="lotto-match-result-form">
        <p class="mt-28">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요</p>
        <div class="flex justify-content-space-between mt-8">
          <div>
            <label for="lotto-winning-number">당첨 번호</label>
            <div class="mt-8 flex column-gap-8">
              <input id="lotto-winning-number" class="lotto-winning-number-container" maxlength="2" />
              ${'<input class="lotto-winning-number-container" maxlength="2" />'.repeat(5)}
            </div>
          </div>
          <div>
            <label for="lotto-winning-bonus-number">보너스 번호</label>
            <div class="flex justify-content-end mt-8">
              <input id="lotto-winning-bonus-number" class="lotto-winning-number-container" maxlength="2" />
            </div>
          </div>
        </div>
        <button id="lotto-match-result-button" class="base-button mt-28" type="submit">결과 확인하기</button>
      </form>
    </section>
  `;
};
