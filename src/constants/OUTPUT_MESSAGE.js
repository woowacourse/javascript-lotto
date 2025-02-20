const LOTTO_NUMBER_SPLITER = ", ";

const OUTPUT_MESSAGE = {
  PURCHASE_COUNT: (count) => `${count}개를 구매했습니다.`,
  LOTTO_NUMBERS: (lottoNumbers) => `[${lottoNumbers.join(LOTTO_NUMBER_SPLITER)}]`,
  PROFIT_RATE: (profitRate) => `총 수익률은 ${profitRate}%입니다.`,
};

export default OUTPUT_MESSAGE;
