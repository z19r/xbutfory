import { Controller } from '@hotwired/stimulus';

// Live client-side feedback on the chosen @handle (format only — the server has the
// final say on uniqueness). Lowercases as you type and reports validity in the aside.
const FORMAT = /^[a-z0-9_]{3,20}$/;

export default class extends Controller {
  static targets = ['input', 'status'];

  check() {
    const value = this.inputTarget.value.toLowerCase();
    if (value !== this.inputTarget.value) this.inputTarget.value = value;

    if (value.length === 0) {
      this.set('', '');
    } else if (value.length < 3) {
      this.set('too short', 'is-warn');
    } else if (!FORMAT.test(value)) {
      this.set('letters, numbers, _', 'is-warn');
    } else {
      this.set('looks good', 'is-ok');
    }
  }

  set(text, state) {
    if (!this.hasStatusTarget) return;
    this.statusTarget.textContent = text;
    this.statusTarget.className = `c-field__aside c-handle-status ${state}`;
  }
}
