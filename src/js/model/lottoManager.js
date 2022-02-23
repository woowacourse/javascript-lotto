class LottoManager {
  buyLotto(cashInput) {
    try {
      LottoManager.validateCashInput(cashInput);
      // 뭔가 처리
    } catch (error) {
      alert(error.message);
    }
  }

  static validateCashInput(cashInput) {
    if (!LottoManager.isValidCashInput(Number(cashInput))) {
      throw new Error('1000원 단위, 1000-50000원 범위가 아님');
    }
  }

  static isNumberInRange({ number, min, max }) {
    return number >= min && number <= max;
  }

  static isNoChangeLeft(insertCash, price) {
    return insertCash % price === 0;
  }

  static isValidCashInput(cashInput) {
    return (
      !!cashInput &&
      LottoManager.isNoChangeLeft(cashInput, 1000) &&
      LottoManager.isNumberInRange({ number: cashInput, min: 1000, max: 50000 })
    );
  }
}

export default LottoManager;
