const LottoList = (lottos) => {
  return `
    <p class="lotto-list__info">총 ${lottos.length}개를 구매하였습니다.</p>
    <ul class="lotto-list__items">
      ${lottos.map((lotto) => `<li class="lotto-list__item"><img src="/assets/Lotto.png" alt="로또" width="34px" /> ${lotto.parseNumbers().join(", ")}</li>`).join("")}
    </ul>
  `;
};

export default LottoList;
