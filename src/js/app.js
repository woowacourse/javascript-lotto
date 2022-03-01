import LottoView from './view/lottoView';
import LottoManager from './model/lottoManager';

import Messenger from './messenger';

const lottoApp = () => {
  const lottoView = new LottoView();
  const lottoManager = new LottoManager();

  const messenger = new Messenger(lottoView, lottoManager);

  lottoView.assignMessenger(messenger.deliverMessage);
  lottoManager.assignMessenger(messenger.deliverMessage);
};

export default lottoApp;
