import { Controller } from '@hotwired/stimulus';
import { takeToast } from 'lib/pending_toast';

export default class extends Controller {
  static targets = ['container', 'message'];

  connect() {
    this._onGlobal = (e) => this.show(e.detail.message, e.detail.duration);
    document.addEventListener('toast:show', this._onGlobal);

    const pending = takeToast();
    if (pending) {
      this.show(pending.message, pending.duration);
    } else if (this.hasMessageTarget && this.messageTarget.textContent.trim()) {
      this.show();
    }
  }

  disconnect() {
    document.removeEventListener('toast:show', this._onGlobal);
  }

  showMessage(event) {
    const msg = event.currentTarget.dataset.message || event.params?.message;
    if (msg) this.show(msg);
  }

  show(message, duration) {
    if (message) {
      this.messageTarget.innerHTML = message;
    }
    this.containerTarget.hidden = false;
    requestAnimationFrame(() => {
      this.containerTarget.classList.add('c-toast--visible');
    });
    clearTimeout(this._autoHide);
    this._autoHide = setTimeout(() => this.dismiss(), duration || 3600);
  }

  dismiss() {
    clearTimeout(this._autoHide);
    this.containerTarget.classList.remove('c-toast--visible');
    setTimeout(() => {
      this.containerTarget.hidden = true;
    }, 180);
  }
}
