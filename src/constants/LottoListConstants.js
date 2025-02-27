const LOTTO_LIST_TITLE_TEMPLATE = (count) =>
  `<span>총 ${count}개를 구매했습니다.</span>`;

const LOTTO_ITEM_TEMPLATE = (numbers) =>
  `<div class="lotto-ticket">🎟️ ${numbers.join(', ')}</div>`;

const LOTTO_TICKETS_WRAPPER_TEMPLATE = (itemsHTML) => `
  <div class="lotto-tickets">
    ${itemsHTML}
  </div>
`;

export {
  LOTTO_LIST_TITLE_TEMPLATE,
  LOTTO_ITEM_TEMPLATE,
  LOTTO_TICKETS_WRAPPER_TEMPLATE,
};
