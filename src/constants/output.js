const OUTPUT = Object.freeze({
  ERROR_PREFIX: '[ERROR]',
  STATSTICS_TITLE: '당첨 통계\n--------------------',
  PURCHASE_AMOUNT: (amount) => `${amount}개를 구매했습니다.`,
  LOTTO_NUMBERS: (lottoNumbers) => `[${lottoNumbers.join(', ')}]`,
  STATSTICS: ({ condition, reward, count }) =>
    `${condition} (${reward.toLocaleString('ko-KR')}원) - ${count}개`,
});

export default OUTPUT;
