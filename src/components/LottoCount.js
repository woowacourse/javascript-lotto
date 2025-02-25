export const LottoCountPrompt = (lottoCount) => {
  const countPrompt = document.createElement("div");
  countPrompt.classList.add("count");
  countPrompt.textContent = `총 ${lottoCount} 개를 구매하였습니다.`;

  return countPrompt;
};
