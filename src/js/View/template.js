const lottoTotalNumber = (number) => `총 ${number}개를 구매하였습니다.`

const lottoListTemplate = {
  icon: (count) => '<span class="ticket">🎟️</span>'.repeat(count),
  number: (lottos) => { 
    const listItems = lottos.map((lotto) => 
      `<li>
      <span class="ticket">🎟️</span>
      <span class="ticket-number normal-text">
      ${lotto.numbers.join(', ')}
      </span>
    </li>`)
    return listItems.join("");
  }
}

export { lottoListTemplate, lottoTotalNumber }