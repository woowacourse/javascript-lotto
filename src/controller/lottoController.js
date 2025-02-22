import InputHandler from '../input/InputHandler.js';
import OutputView from '../view/OutputView.js';
import WinningLotto from '../domain/WinningLotto.js';
import { lottoService } from '../service/lottoService.js';
import { gameService } from '../service/gameService.js';

export const lottoController = {
    async run(){
        const lottoList = lottoService.purchaseLotto(await InputHandler.purchaseMoney())
        OutputView.printLottoNumber(lottoList);

        const winningNumbers = await InputHandler.winningNumbers();
        const bonusNumber = await InputHandler.bonusNumber(winningNumbers.numbers);
        const winningLotto = new WinningLotto(winningNumbers, bonusNumber)

        const lottoResult = lottoService.calculateLottoResult(lottoList, winningLotto)
        OutputView.printStatstics(lottoResult)

        const winningRate = lottoService.calculateWinningRate(lottoList)
        OutputView.print(`총 수익률은 ${winningRate}%입니다.`)

        gameService.reStart(await InputHandler.reStart())
    }
}
