const Validation = {
  validateDistinctNumbers(lottoNumbers) {
    const lottoSet = new Set(lottoNumbers);
    if (lottoNumbers.length !== lottoSet.size) {
      throw new Error('로또 번호는 중복될 수 없습니다.');
    }
  },
};

export default Validation;
