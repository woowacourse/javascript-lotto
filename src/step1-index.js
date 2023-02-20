const LottoMachine = require('./domain/controller/LottoMachine');
const { addCommaToNumber } = require('./utils');

const lottoMachine = new LottoMachine();

// lottoMachine.play();

console.log(addCommaToNumber(12123123123));
console.log(addCommaToNumber(12123123123.123423904132));
