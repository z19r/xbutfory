import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['xInput', 'yInput', 'xDisplay', 'yDisplay', 'preview'];

  // Sync from whatever is already in the fields. Input events fired before
  // this controller connected reached no listener, so without this the
  // preview stays on the placeholder — for restored/prefilled values, and
  // for anyone typing before the JS lands.
  connect() {
    this.update();
    // Readiness marker so the system test can wait for the action bindings
    // before typing; keystrokes sent pre-connect reach no listener.
    this.element.dataset.previewReady = '1';
  }

  update() {
    const x = this.xInputTarget.value.trim() || 'X';
    const y = this.yInputTarget.value.trim() || 'Y';

    this.xDisplayTarget.textContent = x;
    this.yDisplayTarget.textContent = y;

    const formula = this.previewTarget.querySelector(
      '.c-submit-preview__formula'
    );
    if (formula) {
      const isPlaceholder =
        this.xInputTarget.value.trim() === '' ||
        this.yInputTarget.value.trim() === '';
      formula.classList.toggle(
        'c-submit-preview__formula--placeholder',
        isPlaceholder
      );
    }
  }
}
