export const VIEW_MESSAGE = Object.freeze({
  budget: "구입 금액을 입력해 주세요.",
  winningLottoNumbers: "당첨 번호를 입력해 주세요.",
  winningLottoBonus: "보너스 당첨 번호를 입력해 주세요.",
});

export const OUTPUT_MESSAGE = Object.freeze({
  lottoCount(lottoCount) {
    return `${lottoCount}개를 구매했습니다.`;
  },
  lottoArrayToString(lottoArray) {
    return lottoArray.map((numbers) => `[${numbers.join(", ")}]`).join("\n");
  },
});
