const Validator = {
    purchaseAmountValidator(value) {
        if (!Number.isInteger(Number(value))) {
            throw new Error('숫자만 입력해 주세요.');
        }
        if (Number(value) % 1000 !== 0) {
            throw new Error('1000원 단위만 입력 가능합니다.');
        }
    },

    retryValidator(value) {
        if (!['y', 'n'].includes(value)) {
            throw new Error('다시시작 입력은 y 또는 n 만 입력 가능합니다.');
        }
    }
}

export default Validator;
