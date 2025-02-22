import InputHandler from '../input/InputHandler.js';
import OutputView from '../view/OutputView.js';
import { lottoService } from '../service/lottoService.js';
import { gameService } from '../service/gameService.js';
import InputView from '../view/InputView.js';
import { INPUT_MESSAGE } from '../constants/constants.js';

export const lottoController = {
    async run(){
        const lottoList = lottoService.purchaseLotto(await InputHandler.purchaseMoney())
        OutputView.printLottoNumber(lottoList);

        const winningNumbers = await InputHandler.winningNumbers();
        const winningLotto = await lottoService.createWinningLotto(winningNumbers)

        const lottoResult = lottoService.calculateLottoResult(lottoList, winningLotto)
        OutputView.printStatstics(lottoResult)

        const winningRate = lottoService.calculateWinningRate(lottoList, lottoResult)
        OutputView.print(`총 수익률은 ${winningRate}%입니다.`)

        gameService.reStart(await InputHandler.reStart())
    },

    async inputBonusNumber(){
        return await InputView.readUserInput(INPUT_MESSAGE.BONUS_NUMBER)
    },

    printErrorMessage(message){
        OutputView.print(message);
    }
}
