import LottoController from './lottoController.js';
import LottoUI from './lottoUI.js';

const lottoUI = new LottoUI();
const lottoController = new LottoController(lottoUI);
lottoController.init();
