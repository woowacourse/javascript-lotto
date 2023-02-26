import convertToNumeric from '../../utils/convertToNumeric';
import { validateLottoNumber } from '../validator';

export const convertToWinningNumber = (winningNumberInput) =>
  winningNumberInput.map((lottoNumberInput) => {
    const lottoNumber = convertToNumeric(lottoNumberInput);
    validateLottoNumber(lottoNumber);
    return lottoNumber;
  });
