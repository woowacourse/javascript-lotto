class OutputView {
  printLottoResult(rank, rate) {
    const output = `당첨 통계
--------------------
3개 일치 (5,000원) - ${rank[5]}개
4개 일치 (50,000원) - ${rank[4]}개
5개 일치 (1,500,000원) - ${rank[3]}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${rank[2]}개
6개 일치 (2,000,000,000원) - ${rank[1]}개
총 수익률은 ${rate.toFixed(1)}%입니다.`;

    console.log(output);
  }
  printLottos(lottos) {
    const output = `${lottos.length}개를 구매했습니다.
${lottos.map((lotto) => `[${lotto.getNumbers().join(", ")}]`).join("\n")}
`;
    console.log(output);
  }
}

export default OutputView;
