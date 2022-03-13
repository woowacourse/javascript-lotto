import LottoController from './controller/LottoController';
import LottoView from './view/LottoView';
import ModalView from './view/ModalView';

const controller = new LottoController();
const modalView = new ModalView(controller);

new LottoView(modalView, controller);
