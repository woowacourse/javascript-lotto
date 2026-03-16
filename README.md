# 2단계 - 웹 기반 로또 게임

> 1단계에서 구현한 도메인 로직을 재사용하며, UI만 웹으로 전환한다.

## 배포 링크

https://lee-eojin.github.io/javascript-lotto

## 구현할 기능 목록

### 구매

- [ ] 구입 금액을 입력하고 구입 버튼을 클릭하면 로또를 발행한다
- [ ] 구입한 로또 목록을 화면에 표시한다
- [ ] 유효하지 않은 금액 입력 시 에러 메시지를 표시한다

### 당첨 번호 입력

- [ ] 당첨 번호 6개와 보너스 번호 1개를 입력받는다
- [ ] 유효하지 않은 번호 입력 시 에러 메시지를 표시한다

### 결과 확인

- [ ] 결과 확인하기 버튼 클릭 시 당첨 통계 모달을 표시한다
- [ ] 등수별 당첨 개수와 수익률을 표시한다

### 재시작

- [ ] 다시 시작하기 버튼 클릭 시 게임을 초기화한다

---

## 프로젝트 구조

```
src/
├── step1-index.js                        # CLI 진입점
├── step2-index.js                        # 웹 진입점 (WebApp 초기화)
│
├── console/                              # CLI 전용 (step1)
│   ├── ConsoleInputView.js
│   └── ConsoleOutputView.js
│
├── controller/
│   ├── App.js                            # CLI 컨트롤러 (step1)
│   └── WebApp.js                         # 이벤트 핸들러, 도메인 - 뷰 연결
│
├── web/
│   └── components/
│       ├── PriceInputForm.js             # 구입 금액 입력 폼
│       ├── LottoList.js                  # 구매한 로또 목록 표시
│       ├── WinningNumbersInputForm.js    # 당첨번호 + 보너스번호 입력 폼
│       └── GameResultDialog.js           # 당첨 통계 모달
│
├── service/
│   └── LottoManager.js
│
├── domain/
│   ├── Lotto.js
│   ├── Money.js
│   ├── WinningNumber.js
│   ├── LottoResult.js
│   ├── Rank.js
│   └── generateLottos.js
│
├── constants/
│   ├── messages.js
│   └── rules.js
│
└── style/
    ├── main.css                          # @import 진입점
    ├── reset.css                         # 브라우저 기본값 초기화 (브라우저 호환성)
    ├── variables.css                     # 디자인 토큰 - 색상, 폰트 (디자인 시안)
    ├── base.css                          # 전역 태그 스타일, 타이포그래피
    └── layouts/
        ├── header.css
        ├── footer.css
        ├── lotto-game.css
        └── lotto-result.css
```

#### CSS 파일 분리 기준

> 파일을 나누는 기준: 변경 이유가 다른가

- `reset.css` — 브라우저 호환성 이슈가 생길 때 변경
- `variables.css` — 디자인 시안이 바뀔 때 변경
- `base.css` — 전체 타이포그래피 정책이 바뀔 때 변경
- `layouts/*.css` — 해당 레이아웃 디자인이 바뀔 때 변경

#### 컴포넌트 설계 기준

> 컴포넌트는 자신의 DOM을 직접 생성하고 마운트/언마운트를 관리

- 각 컴포넌트는 `mount(container)` 로 필요할 때 DOM에 추가
- 재시작 시 `unmount()` 로 DOM에서 제거
- 도메인 로직은 컴포넌트가 아닌 `WebApp` → `LottoManager` 에서 처리
