<h1 align="middle">🎱</h1>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>

## 실행 방법
```bash
git clone -b step2 --single-branch https://github.com/rbgksqkr/javascript-lotto.git
cd javascript-lotto
npm i
npm run start-step2
```

## 기능 요구 사항

### UI
- [x] header
- [ ] footer
- [ ] 전체 레이아웃 구성
- [ ] 로또 구입 금액, 당첨번호, 보너스 번호 input
- [ ] 당첨 통계 모달

### 웹 기반 로또 게임
- [ ] 로또 구입 금액 input으로 입력받기
  - [ ] 구매 금액 유효성 검사 예외 발생 시 alert 또는 텍스트 알림
- [ ] 구입 버튼 클릭 시 사용자가 구매한 로또 번호 목록을 화면에 출력
- [ ] 당첨번호 6개와 보너스 번호 1개를 input으로 입력받기
  - [ ] 로또 번호 유효성 검사 예외 발생 시 alert 또는 텍스트 알림
- [ ] 결과 확인 버튼 클릭 시 당첨 통계 화면에 출력
  - [ ] 당첨 갯수 렌더링
  - [ ] 계산한 수익률 렌더링
  - [ ] 다시 시작하기 버튼 클릭 시 처음 로또 구입 금액 단계로 이동