const { $, $$ } = require('../utils/DOM.js');

const display = {
  showBuyLottoCount(lottoCount) {
    return ($('.purchased-lotto-label').innerHTML = `총 ${lottoCount}개를 구매하였습니다.`);
  },
};

module.exports = display;
