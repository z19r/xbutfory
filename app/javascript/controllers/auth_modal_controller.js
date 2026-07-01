import { Controller } from '@hotwired/stimulus';

// A sign-in prompt shown when a logged-out visitor tries a member-only action
// (e.g. voting). Opened by dispatching `auth-modal:open` on document.
export default class extends Controller {
  static targets = ['card'];

  connect() {
    this._onOpen = () => this.open();
    document.addEventListener('auth-modal:open', this._onOpen);
  }

  disconnect() {
    document.removeEventListener('auth-modal:open', this._onOpen);
  }

  open() {
    this.element.hidden = false;
    document.body.style.overflow = 'hidden';
    // Focus the first action so keyboard users land inside the dialog.
    const focusable = this.cardTarget.querySelector('a, button');
    if (focusable) focusable.focus();
  }

  close() {
    this.element.hidden = true;
    document.body.style.overflow = '';
  }

  onKeydown(event) {
    if (event.key === 'Escape' && !this.element.hidden) {
      this.close();
    }
  }
}
