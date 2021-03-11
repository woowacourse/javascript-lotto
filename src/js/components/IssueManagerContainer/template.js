const TEMPLATE = {
  TITLE: (totalIssuableLottoCount) => {
    return `총 ${totalIssuableLottoCount}개의 로또를 발급가능합니다.`;
  },
  ENTRY: (index) => {
    return `
  <div class="my-2" data-js-selector="issue-manager__entry">
    <label class="text-sm font-normal" data-issue-mode="auto">
      <input type="radio" name="issue-mode-${index}" value="auto" data-entry-index="${index}" checked />
      <span>자동</span>
    </label>
    <label class="text-sm font-normal" data-issue-mode="manual">
      <input type="radio" name="issue-mode-${index}" value="manual" data-entry-index="${index}" />
      <span>수동</span>
    </label>
    <input
      type="number"
      class="issue-lotto-number mx-1 text-center"
      min="1"
      max="45"
      step="1"
      placeholder="00"
      required
      disabled
      name="entry__number-${index}"
    />
    <input
      type="number"
      class="issue-lotto-number mx-1 text-center"
      min="1"
      max="45"
      step="1"
      placeholder="00"
      required
      disabled
      name="entry__number-${index}"
    />
    <input
      type="number"
      class="issue-lotto-number mx-1 text-center"
      min="1"
      max="45"
      step="1"
      placeholder="00"
      required
      disabled
      name="entry__number-${index}"
    />
    <input
      type="number"
      class="issue-lotto-number mx-1 text-center"
      min="1"
      max="45"
      step="1"
      placeholder="00"
      required
      disabled
      name="entry__number-${index}"
    />
    <input
      type="number"
      class="issue-lotto-number mx-1 text-center"
      min="1"
      max="45"
      step="1"
      placeholder="00"
      required
      disabled
      name="entry__number-${index}"
    />
    <input
      type="number"
      class="issue-lotto-number mx-1 text-center"
      min="1"
      max="45"
      step="1"
      placeholder="00"
      required
      disabled
      name="entry__number-${index}"
    />
  </div>
`;
  },
};

export default TEMPLATE;
