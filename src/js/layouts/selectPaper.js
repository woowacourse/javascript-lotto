const getSelectPaperItemHTML = (quantity) => {
  return `
  <li>
    <label>
      <input type="checkbox" aria-label="select${quantity}" />
      <span>${quantity}</span>
    </label>
  </li>
  `;
};

const getApplyQuantitySelectHTML = (quantity) => {
  return quantity === 1
    ? `<option value="${quantity}" class="selected" selected>${quantity}장</option>`
    : `<option value="${quantity}">${quantity}장</option>`;
};

export const getSelectPaperHTML = ({ maxQuantity }) => {
  return `
  <div class="manual-select-paper mt-3 d-flex flex-col">
    <div class="quantity-applier mb-5 d-flex items-end">
      <label class="mr-2 text-sm">적용수량</label>
      <select class="quantity-select">
        ${[...Array(maxQuantity)].map((_, i) => getApplyQuantitySelectHTML(i + 1)).join('')}
      </select>
    </div>
    <ul class="select-paper m-0 p-0">
      ${[...Array(45)].map((_, i) => getSelectPaperItemHTML(i + 1)).join('')}
    </ul>
    <div class="manual-select-check-message text-sm"></div>
    <button type="button" class="paper-remove-button r-btn">-</button>
  </div>`;
};
