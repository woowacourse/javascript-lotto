import domSelector from './domSelector';
const { lottoPrice, inputWinningLottos, inputBonusLotto } = domSelector;

const inputView = {
  inputLottoPrice() {
    return parseInt(lottoPrice.value);
  },

  inputWinningNumbers() {
    const winningLottos = [];
    inputWinningLottos.forEach((inputWinningLotto) => {
      winningLottos.push(parseInt(inputWinningLotto.value));
    });
    return winningLottos;
  },

  inputBonusNumber() {
    return parseInt(inputBonusLotto.value);
  },
};

export default inputView;
