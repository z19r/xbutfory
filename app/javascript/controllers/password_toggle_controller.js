import { Controller } from '@hotwired/stimulus';

// Reveals/hides a password field, flipping the SHOW/HIDE label.
export default class extends Controller {
  static targets = ['input', 'button'];

  toggle() {
    const reveal = this.inputTarget.type === 'password';
    this.inputTarget.type = reveal ? 'text' : 'password';
    if (this.hasButtonTarget)
      this.buttonTarget.textContent = reveal ? 'HIDE' : 'SHOW';
  }
}
