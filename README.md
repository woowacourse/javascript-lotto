# javascript-lotto

# 📍 학습 목표

- UI와 도메인 영역을 분리할 수 있는 설계를 고민해보고, 목적에 맞게 객체와 함수를 활용
- 단위 테스트 기반으로 점진적인 리팩터링

# 기능 구현 목록

## UI

### 입력

- [x] 구입 금액
  - [x] 구입 금액은 빈 값일 수 없다.
  - [x] 구입 금액은 숫자여야 한다.
  - [x] 구입 금액은 양의 정수여야 한다. (소수 예외 처리)
  - [x] 구입 금액은 1000원 이상이여야 한다.
- [x] 당첨 번호
  - [x] 당첨 번호는 빈 값일 수 없다.
  - [x] 당첨 번호는 숫자여야 한다.
  - [x] 당첨 번호는 양의 정수여야 한다. (소수 예외 처리)
  - [x] 당첨 번호는 중복될 수 없다.
  - [x] 당첨 번호는 1이상 45이하의 정수이다.
  - [x] 당첨 번호의 개수는 6개여야 한다.
- [x] 보너스 번호
  - [x]당첨 번호랑 중복될 수 없다.
  - [x] 당첨 번호는 빈 값일 수 없다.
  - [x] 당첨 번호는 숫자여야 한다.
  - [x] 당첨 번호는 양의 정수여야 한다. (소수 예외 처리)
  - [x] 당첨 번호는 1이상 45이하의 정수이다.
- [ ] 재시작 여부
  - [ ] 입력은 오직 'y' 또는 'n'이여야 한다.
  - [ ] 소문자로 입력해야 한다.

### 출력

- [ ] 구매 수량
- [ ] 랜덤 로또 티켓 출력
- [ ] 당첨 통계
- [ ] 총 수익률

## Domain

- [x] 구매 수량 계산
- [x] 랜덤 로또 티켓 발행
- [x] 당첨 통계 계산
  - [x] 당첨 번호 일치 계산
  - [x] 보너스 번호 일치 계산
- [x] 수익률 계산

## Util

- [x] 랜덤 숫자 생성 함수

# 폴더 구조

# 🎯 기능 요구 사항

```
어느 평화로운 개발팀,
개발하다 한번씩 심심풀이로 돌려보는 용도로 간단한 콘솔 기반의 로또 게임을 만들어 보기로 한다.

로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.
로또 번호는 오름차순으로 정렬하여 보여준다.
로또 1장의 가격은 1,000원이다.
당첨 번호와 보너스 번호를 입력받는다.
사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.
당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.
1등: 6개 번호 일치 / 2,000,000,000원
2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
3등: 5개 번호 일치 / 1,500,000원
4등: 4개 번호 일치 / 50,000원
5등: 3개 번호 일치 / 5,000원
당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다.
재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.
사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.
```

# 실행 결과 예시

```
> 구입금액을 입력해 주세요.8000
8개를 구매했습니다.
[8, 21, 23, 41, 42, 43]
[3, 5, 11, 16, 32, 38]
[7, 11, 16, 35, 36, 44]
[1, 8, 11, 31, 41, 42]
[13, 14, 16, 38, 42, 45]
[7, 11, 30, 40, 42, 43]
[2, 13, 22, 32, 38, 45]
[1, 3, 5, 14, 22, 45]
> 당첨 번호를 입력해 주세요. 1,2,3,4,5,6

> 보너스 번호를 입력해 주세요. 7

당첨 통계
--------------------
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.

> 다시 시작하시겠습니까? (y/n)
```
