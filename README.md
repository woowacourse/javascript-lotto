# 기능

[ ] 구입 금액 입력 받기
[ ] 구입 금액 최소 금액 1000으로 나눠 떨어지는 자연수여야한다.
[ ] 구입 금액은 최대 10,000,000,000이다.  
[ ] 로또 구매하기
[ ] 로또 정보 출력하기
[ ] 보너스 번호 입력받기
[ ] 당청 번호 입력받기
[ ] 당첨 통계 출력하기
[ ] 다시 시작 입력받기

# 설계

domain/

Lotto.js

- ✅ 중복되지않은 6개의 1~45 랜덤 숫자를 발행

Winnings.js

- 당첨번호와 보너스번호를 저장 (당첨번호는 숫자배열, 보너스번호는 숫자)
- 당첨번호는 중복되지 않아야함
- 1~45 사이의 자연수
- 보너스번호는 당첨번호와 중복되면 안됨
- 보너스 번호는 1~45 사이의 자연수
- 당첨통계 계산(머신한테 Lotto 배열을 받아서 당첨 통계 계산) => ([lotto1{}, lotto2{}...])

LottoMachine.js

- #lottos 상태를 저장
- createLottos() => 로또 배열을 만들어서 반환
- createLottos() 반환값을 #lottos에 저장해주는 saveLottos()
- winnings()에서 받은 당첨통계를 LottoController에 반환해줄 메서드

Validator.js

- 배열 안에 중복이 있는가?
- 1~45 사이의 숫자인가? -> isRangeNumber
- 자연수인가? -> isNaturalNumber
- 빈 값인가? -> isEmpty
- 배열 길이가 6인가? isArrayLengthOver
- ( array, num ) -> 배열안에 num 이 존재하는지? isExistInArray
- 1000단위로 나누어 떨어지는 숫자인가? isThousandMultiple
  => 당첨번호 메서드, 보너스번호 메서드, 구입금액 메서드

view/
InputView.js

- 당첨번호 입력
- 구입금액 입력
- 보너스번호 입력
- 다시 시작하시겠습니까?(Y/N)
  OutputView.js
- n개를 구매했습니다
- 구매한 로또리스트 출력
- newLine
- boundary
- 당첨 통계
- n개 일치 (n원) - n개
- 총 수익률

controller/
LottoController.js
