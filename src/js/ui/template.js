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

export function lottoResultTableTemplate(machine) {
  return `  <div class="grid table-title"><span>일치 갯수</span><span>당첨금</span><span>당첨 갯수</span></div>
    <div class="grid"><span>3개</span><span>5,000</span><span>${machine.getNumberOfGrade(
      'fifth'
    )}개</span></div>
    <div class="grid"><span>4개</span><span>50,000</span><span>${machine.getNumberOfGrade(
      'fourth'
    )}개</span></div>
    <div class="grid"><span>5개</span><span>1,500,000</span><span>${machine.getNumberOfGrade(
      'third'
    )}개</span></div>
    <div class="grid"><span>5개+보너스볼</span><span>30,000,000</span><span>${machine.getNumberOfGrade(
      'second'
    )}개</span></div>
    <div class="grid"><span>6개</span><span>2,000,000,000</span><span>${machine.getNumberOfGrade(
      'first'
    )}개</span></div>
 `;
}
