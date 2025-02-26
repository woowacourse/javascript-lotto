export const outputViewByWeb = {
  displayLottoCount(lottoCounts) {
    const $p = document.createElement('p');
    $p.setAttribute('class', 'lotto-count-display');
    $p.textContent = `총 ${lottoCounts}개를 구매했습니다.`;
    document.querySelector('.lotto-list-display').appendChild($p);
  },

  displayErrorMessage(error) {
    alert(error.message);
  },
};
