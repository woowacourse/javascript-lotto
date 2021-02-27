const getSelectPaperItemHTML = ({ index }) => {
  return `
  <li>
    <label>
      <input type="checkbox" aria-label="select${index}" />
      <span>${index}</span>
    </label>
  </li>
  `;
};

export const getSelectPaperHTML = () => {
  return `
  <div class="number-selectors d-flex flex-col">
    <div class="apply-quantity mb-5 d-flex items-end">
      <label class="mr-2 text-sm">적용수량</label>
      <select class="apply-quantity-select">
        <option class="selected" value="1">1장</option>
      </select>
    </div>
    <ul class="select-paper m-0 p-0">
      ${[...Array(45)].map((_, i) => getSelectPaperItemHTML(i + 1)).join('')}
    </ul>
    <div class="select-check-message text-sm">6개를 모두 골라주세요!</div>
    <button type="button" class="paper-remove-button r-btn">-</button>
  </div>`;
};
