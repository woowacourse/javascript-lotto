const PURCHASED_LOTTO_TEMPLATE = `
        <div id="purchased-lotto-box">
          <p>
            총 <span id="purchased-lotto-count"></span>개를 구매하였습니다.
          </p>
          <div id="purchased-lotto-list-off" ></div>
          <div id="purchased-lotto-list-on" class="hidden"></div>
        </div>
        <div id="toggle-box">
          <p>번호 보기</p>
          <label for="purchased-lotto-number-switch" class="switch">
            <input id="purchased-lotto-number-switch" type="checkbox" />
            <span class="slider round"></span>
          </label>
        </div>
`;

const LOTTO_IMAGE_TEMPLATE = `
  <span class="purchased-lotto-image">🎟️</span>
`;

const getLottoDetailTemplate = lotto => {
  return `
    <div class="purchased-lotto-item">
      ${LOTTO_IMAGE_TEMPLATE}
      <div class="purchased-lotto-number">${lotto.join(', ')}</div>
    </div>
  `;
};

export {
  PURCHASED_LOTTO_TEMPLATE,
  LOTTO_IMAGE_TEMPLATE,
  getLottoDetailTemplate,
};
