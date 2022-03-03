# 로또

## 구조도
<img src="./../images/Diagram.jpg">

## 기능 구현 사항

- [x] 로또금액을 입력할수 있다.

  - [예외] 금액은 1000단위로 나누어 져야한다.
  - [예외] 금액은 1000원 이상이여야 한다.
  - [예외] 숫자를 제외한 입력이 들어오면 안된다.

- [x] 구입버튼을 클릭시 로또가 구입한 개수만큼 보여진다.

  - [x] 번호보기 스위치를 클릭하여 로또 번호를 숨기고 보여줄수 있다.
  - [x] 로또번호는 1 ~ 45까지의 숫자중에서 랜덤으로 6개의 숫자를 보여준다.

- [x] 구입버튼을 클릭시 당첨번호를 입력하는 창을 보여준다.
  - [ ] 당첨번호 6개와 보너스 번호를 입력할수 있다.
    - [예외] 중복된 번호를 입력하면 안된다.
    - [예외] 범위(1 ~ 45)를 벗어난 숫자를 입력하면 안된다.
    - [예외] 숫자를 제외한 입력이 들어오면 안된다.
- [ ] 결과 확인하기 버튼을 누르면 일치하는 갯수와 수익률을 계산하여 보여준다.
  - [ ] 결과창을 제외하고는 클릭을 막는다.
  - [ ] 결과창의 X를 클릭하면 결과창이 닫긴다.
- [ ] 다시 시작하기 버튼을 누를시 초기창으로 돌아간다.

## 리팩터링 
- [x] submitLottoPriceHandler 네이밍 -> handleLottoPriceButtonSubmit
- [x] const { value } 이름 
- [ ] 리뷰어님  
  - [x] this.model 이름 변경 
  - [x] getLottoNumbers 네이밍 변경 
  - [ ] setLottoCount 네이밍 수정 및 lottoCount 상태로 둘지 고민 
  - [ ] generateLottos for문 대신 메서드 사용 
  - [ ] 이벤트 등록의 책임 View로 옮기기 
  - [ ] app.test.js에서 로또 숫자가 중복된 케이스도 추가 
  - [ ] LottoModel의 while문 수정 (무한루프)
- [ ] 페어 리뷰어님 
  - [ ] 중복되는 css 컬러 css변수로 관리 
  - [ ] app.test.js에서 LOTTO_NUMBERS, ALERT_MESSAGE 에 있는 데이터 이용해서 검증하기 
  - [ ] constants/TOUSAND는 의미있는 네이밍이 아니라 매직넘버이다. 로또 금액에 대한 변수 네이밍으로 변경하기 
  - [ ] model에서, getter와 setter를 통해서만 데이터에 접근하고 싶으면 private 사용해보기 
  - [ ] controller에서 setLottoCount, setLottos를 굳이 노출할 필요가 없다. (읽으면 뭐하는지 잘 모름)controller에서는 행동기반으로 작성! (두개 합쳐서 buyLottos와 같이)
  - [ ] value.match(/[0-9]/) 부분을 Number.isInteger를 사용해서 변경 
  - [ ] 셀렉터 상수로 분리 ($, $$와 같이)
  - [ ] 실제 로또처럼 한번 뽑힌 로또에 대해서는 다시 안뽑히게 작성해보기 (lottoModel의 while문)
  - [ ] input type="number"에 대한 것의 value를 가져오고 싶을 때, valueAsNumber를 사용해보기 (submitLottoPriceHandler)
  - [ ] 로또 구매 가능 최대 개수 설정 (100개 추천)
- [ ] 수업 1단계 피드백 
  - [ ] 태그 100% 사용(input-min, max 속성 사용해보기)
  - [ ] 사용자 생각 - catch문 error메시지 
