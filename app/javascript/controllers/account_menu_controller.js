import { Controller } from '@hotwired/stimulus';

// Toggles the signed-in account dropdown; closes on outside click or Escape.
export default class extends Controller {
  static targets = ['dropdown', 'trigger'];

  toggle() {
    this.dropdownTarget.hidden ? this.open() : this.close();
  }

  open() {
    this.dropdownTarget.hidden = false;
    this.triggerTarget.setAttribute('aria-expanded', 'true');
  }

  close() {
    this.dropdownTarget.hidden = true;
    this.triggerTarget.setAttribute('aria-expanded', 'false');
  }

  closeOutside(event) {
    if (!this.element.contains(event.target)) this.close();
  }
}
