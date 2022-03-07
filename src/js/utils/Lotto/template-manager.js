import { SELECTOR } from '../../constants/selector';

export const makeLottosCountTemplate = (count) => `총 ${count}개를 구매하였습니다.`;

export const makeLottoTemplate = (numbers) => `
  <div class="${SELECTOR.CLASS.LOTTO_ITEM}"><span>🎟️</span> <span class="${SELECTOR.CLASS.LOTTO_ITEM_NUMBER}">${numbers}</span></div>
  `;

export const lottoListSectionTemplate = `
<h2 hidden>로또 번호 목록</h2>
<div class="lotto-title">
  <span id="lotto-bought-count"></span>
  <span>번호 보기</span>
</div>
<div class="lotto-list-container">
  <div class="lotto-item-container">
  </div>
  <div>
    <div id="lotto-number-toggle"></div>
  </div>
</div>
`;

export const winningNumberSectionTemplate = `
<h2 hidden>결과 확인</h2>
        <form id="winning-number-form">
          <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
          <div class="winning-number-container">
            <div class="winning-numbers-wrapper">
              <span>당첨 번호</span>
              <div class="winning-number-inputs-wrapper">
              ${[...Array(6)]
                .map(
                  (_, index) =>
                    `<input class="winning-number-input" data-index="${
                      index + 1
                    }" min="1" max="45" type="number" />`
                )
                .join('')}
              </div>
            </div>
            <div class="bonus-number-wrapper">
              <span>보너스 번호</span>
              <div class="bonus-number-input-wrapper">
                <input class="bonus-number-input" data-index="7" min="1" max="45" type="number" />
              </div>
            </div>
          </div>
          <button class="btn" id="show-result-button">결과 확인하기</button>
        </form>
`;
