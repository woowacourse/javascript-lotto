const Component = {
  purchaseLottoCount(count) {
    return `<p id="purchase-lotto-count-message">총 ${count}개를 구매했습니다.</p>`;
  },

  lottoList(lottoNumbers) {
    const listItems = lottoNumbers.map((lottoNumber) => {
      return `<li><span>🎟️</span>${lottoNumber.join(', ')}</li>`;
    });
    return `<ul id="purchase-lotto-list">${listItems.join('')}</ul>`;
  },
}

export default Component
