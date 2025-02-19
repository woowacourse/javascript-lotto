# 🎰 로또 게임
## 🧰 기능

- [X] 구입 금액 입력 받기
- [X] 수량(구입 금액 / 1000)만큼 로또 발행
    - [X] 랜덤 숫자 생성 (1~45 사이의 중복 없는 6개의 숫자)
    - [X] 오름차순 정렬
- [X] 발행한 로또 번호 출력
- [X] 당첨번호 입력 받기
    - [X] 쉼표로 구분
- [X] 보너스 번호 입력 받기
- [ ] 사용자가 구매한 로또 번호와 당첨 번호 비교
    - [X] 당첨 기준에 따라 당첨 내역 출력
    - [ ] 총 당첨 금액 계산
    - [ ] 총 수익률 출력 (소수점 한 자리까지 출력, 둘째 자리에서 반 올림)
- [ ] 재시작/종료 여부 입력 받기
    - [ ] 재시작: 구입 금액 입력부터 게임 다시 시작
    - [ ] 종료: 프로그램 종료

## 당첨 기준

- 1등: 6개 번호 일치 / 2,000,000,000원
- 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
- 3등: 5개 번호 일치 / 1,500,000원
- 4등: 4개 번호 일치 / 50,000원
- 5등: 3개 번호 일치 / 5,000원

## 예외
- [ ] throw문을 사용해 예외를 발생시키고, 에러 메시지 출력 후 그 부분부터 다시 입력 받기
### 구입 금액
- [X] 1_000으로 나누어 떨어지지 않는 경우
- [X] 숫자가 아닌 경우
- [X] 1_000 미만의 숫자인 경우
- [X] 100_000을 초과하는 경우

### 당첨 번호
- [X] 중복되는 숫자가 있는 경우
- [X] 1~45 사이의 숫자가 아닌 경우
- [X] 숫자가 아닌 값이 있는 경우
- [X] 숫자의 개수가 6개가 아닌 경우

### 보너스 번호
- [X] 숫자가 아닌 경우
- [X] 1~45 사이의 숫자가 아닌 경우
- [X] 당첨 번호랑 중복되는 경우

### 재시작 여부
- [ ] y(Y) or n(N)가 아닌 다른 값이 입력된 경우