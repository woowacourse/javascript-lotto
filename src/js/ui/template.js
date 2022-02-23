export const ticketImg = '<div>🎟️</div>';

export function lottoNumberTemplate(lottoNumber) {
  return `<div class="items-center">
              🎟️
             <div class="lotto-numbers-container">${lottoNumber}</div>
          </div>`;
}

export function purchaseMessageTemplate({ length }) {
  return `총 ${length}개를 구매하였습니다.`;
}
