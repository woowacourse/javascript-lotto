import LottoView from './view/lottoView';
import LottoPurchaseMachine from './machine/lottoPurchaseMachine';
import LottoWinnerMachine from './machine/lottoWinnerMachine';

import Messenger from './messenger';

const lottoApp = () => {
  const lottoView = new LottoView();
  const lottoPurchaseMachine = new LottoPurchaseMachine();
  const lottoWinnerMachine = new LottoWinnerMachine();

  const messenger = new Messenger(lottoView, lottoPurchaseMachine);

  lottoView.assignMessenger(messenger.deliverMessage);
  lottoPurchaseMachine.assignMessenger(messenger.deliverMessage);
  lottoWinnerMachine.assignMessenger(messenger.deliverMessage);
};

export default lottoApp;
