# 기능 목록
1. [] 로또 구입 금액을 입력 받는다. - ui
  - [x] 공백 입력 예외처리 - domain -> Validate
  - [x] 숫자 이외의 입력 예외처리 - domain -> Validate
  - [x]천원 단위로 떨어지지 않는 경우 예외처리 - domain -> Validate
  - [x] 구입 금액 범위(1000~100000) 예외처리  - domain -> Validate
2. [x] 구입 금액에 해당하는 만큼 로또를 발행한다. - domain -> LottoMachine
  - [x] 1~45의 랜덤 숫자 6개를 생성 - domain -> util
  - [x] 6자리 숫자로 로또를 만든다 - domain -> Lotto
  - [x] 로또 번호는 오름차순으로 정렬 - domain -> Lotto
3. [] 발행된 로또 출력한다. - ui
4. [] 당첨 번호를 입력 받는다. - ui
  - [x] 공백 입력 예외처리 - domain -> Validate
  - [x] 숫자 이외의 입력 예외처리 - domain -> Validate
  - [x] 1~45 범위 밖 입력 예외처리 - domain -> Validate
  - [x] 중복 번호 입력 예외처리 - domain -> Validate
5. [] 보너스 번호를 입력 받는다. - ui
  - [x] 공백 입력 예외처리 - domain -> Validate
  - [x] 숫자 이외의 입력 예외처리 - domain -> Validate
  - [x] 1~45 범위 밖 입력 예외처리 - domain -> Validate
  - [x] 당첨 번호와 중복 입력 예외처리 - domain -> Validate
6. [x] 입력받은 당첨번호와 보너스번호를 저장한다. - domain -> Winning
7. [] 당첨 통계 계산한다. - domain -> Winning
 - [] 각 등수별 당첨 여부 확인 - domain -> Winning
8. [] 당첨 통계를 출력한다. - ui
 - [] 5등부터 1등까지 순서대로 출력 - ui
9. [] 수익률 계산한다. - domain -> LottoMachine
 - [] 소숫점 두번째 자리 이하 버림하여 계산. - domain -> util
10. [] 계산된 수익률 출력한다. - ui
11. [] 다시 시작 여부를 입력한다 - ui
12. [] 다시 시작한다. - domain -> LottoMachine
  - [] 재시작 또는 종료 - domain