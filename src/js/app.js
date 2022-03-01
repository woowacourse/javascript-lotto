import LottoView from './view/lottoView';
import LottoMachine from './machine/lottoMachine';

import Messenger from './messenger';

const lottoApp = () => {
  const lottoView = new LottoView();
  const lottoMachine = new LottoMachine();

  const messenger = new Messenger(lottoView, lottoMachine);

  lottoView.assignMessenger(messenger.deliverMessage);
  lottoMachine.assignMessenger(messenger.deliverMessage);
};

export default lottoApp;
