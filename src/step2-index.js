require('./style/index.css');
const WebLottoMachine = require('./domain/controller/WebLottoMachine');

const webLottoMachine = new WebLottoMachine();

webLottoMachine.play();
