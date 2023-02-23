import convertToNumeric from '../../util/convertToNumeric';
import { validateLottoNumber } from '../validator';

export const convertToWinningNumber = (winningNumberInput) =>
  (typeof winningNumberInput === 'string' ? winningNumberInput.split(',') : winningNumberInput).map(
    (lottoNumberInput) => {
      const lottoNumber = convertToNumeric(lottoNumberInput);
      validateLottoNumber(lottoNumber);
      return lottoNumber;
    },
  );
