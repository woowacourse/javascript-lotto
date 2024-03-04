# 리팩토링 목록

## 2단계 피드백 반영

- [x] 한 번 결과를 확인하고나면 x를 눌러서 모달을 닫은 후 당첨 로또 숫자를 고쳐도 바꾼 게 적용이 안되는 부분 - disable보다는 당첨 로또 숫자를 고치면 결과가 바뀌도록
- [ ] element를 잡아내지 못했을 경우(undefined)도 대비해두기 (안전성)
- [x] CSS 순서 통일을 자동화할 수 있는 도구 - prettier-plugin-css-order
- [x] css 중복, 상수 적용 안하고 있는 것 적용

## 1단계 피드백 반영

- [x] 네이밍 오타 찾기 - code Spell Checker 익스텐션
- [x] 테스트 명세를 자세히 써보기
- [x] EOF 찾아보기
- [x] App 객체의 필요성
- [x] 원본 배열의 참조를 getter로 넘기는 것 수정
- [x] calculateROI 함수가 유틸 함수인가?
- [x] #drawLottos 함수에서 코드를 더 간결히 - Array 메서드 정리.
- [x] #checkWinningLotto 의 위치 변경 - 관련된 함수끼리는 가까이
- [x] Lotto.js에서 6이 의미하는 것 - 매직 넘버 주의!!!
- [x] Lotto.js에서 constructor 간결하게 가능
- [x] 당첨번호 입력 시, 엔터만 치면 undefined가 나오는 것 처리
- [x] 전체적인 타입 통일성 - 테스트코드와 함께
- [x] 다시 시작할때, y/n과 Y/N 모두 가능하도록.
- [x] LottoMachine 필드 갯수 줄이기

- [ ] retryOnInvalidInput
