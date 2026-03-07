export class Lotto {
	#numbers;

	constructor(numbers) {
		this.#validate(numbers);
		this.#numbers = numbers;
	}

	#validate(numbers) {
		if (numbers.length !== 6) {
			throw new Error('로또 번호는 6개여야 합니다.');
		}
		if (new Set(numbers).size !== numbers.length) {
			throw new Error('중복되는 로또 번호가 존재합니다.');
		}
		numbers.forEach(number => {
			number = Number(number);
			if (!Number.isInteger(number)) {
				throw new Error('당첨 번호는 숫자만 입력 가능합니다.');
			}
			if (number > 45 || number < 0) {
				throw new Error('1 ~ 45 이내 숫자만 입력 가능합니다.');
			}
		});
	}

	getLottoNumber() {
		return [...this.#numbers];
	}
}


export class WinningLotto extends Lotto {
	#bonusNumber;

	constructor(numbers, bonusNumber) {
		super(numbers.map((lottoNumber) => Number(lottoNumber)));
		this.#validateBonusNumber(bonusNumber);
		this.#bonusNumber = Number(bonusNumber)
	}

	#validateBonusNumber(bonusNumber) {
		bonusNumber = Number(bonusNumber);
		if (!Number.isInteger(bonusNumber)) {
			throw new Error('보너스 번호는 숫자여야 합니다.');
		}
		if (bonusNumber > 45 || bonusNumber < 0) {
			throw new Error('보너스 번호는 1 ~ 45 이내 숫자여야 합니다.');
		}
		if (new Set([...this.getLottoNumber(), bonusNumber]).size !== 7) {
			throw new Error('보너스 번호는 당첨 번호와 중복될 수 없습니다.');
		}
	}

	getBonusNumber() {
		return this.#bonusNumber;
	}
}
