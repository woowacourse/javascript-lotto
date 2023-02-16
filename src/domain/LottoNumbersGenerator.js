const Random = require('../util/Random');

const generateLottoNumbers = () => {
  const lottoNumbers = [];
  while (new Set(lottoNumbers).size !== 6) {
    lottoNumbers.push(Random.pickNumberInRange(1, 45));
  }
  return [...new Set(lottoNumbers)];
};

module.exports = generateLottoNumbers;
