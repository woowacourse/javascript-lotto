const OutputView = {
  printErrorMessage(message) {
    console.log(message);
  },

  printLottoQuantity(lottoQuantity) {
    console.log(`${lottoQuantity}개를 구매했습니다.`);
  },

  printEachLottoNumbers(eachLottoNumbers) {
    eachLottoNumbers.forEach((lottoNumbers) => {
      const numbersTemplate = lottoNumbers.join(', ');
      const template = `[${numbersTemplate}]`;

      console.log(template);
    });
  },
};

export default OutputView;
