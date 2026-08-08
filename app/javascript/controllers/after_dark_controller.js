import { Controller } from '@hotwired/stimulus';
import { queueToast } from 'lib/pending_toast';

export default class extends Controller {
  static targets = ['button'];
  static values = { signedIn: Boolean };

  connect() {
    this.active = this.signedInValue && this.isActive();
    this.render();
  }

  toggle() {
    this.active = !this.active;
    const value = this.active ? '1' : '0';
    document.cookie = `after_dark=${value}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;

    const message = this.active
      ? '🔞 After Dark unlocked. You asked for it. No judgment.'
      : '😇 Back to the safe-for-work zone.';

    // The reload below throws away the current body, so hand the toast to the
    // next page instead of dispatching it here.
    queueToast(message, 4500);

    this.render();
    Turbo.visit(window.location.href, { action: 'replace' });
  }

  // Logged-out visitors can't use After Dark — nudge them to sign in.
  promptSignIn(event) {
    event.preventDefault();
    document.dispatchEvent(new CustomEvent('auth-modal:open'));
  }

  // Members are opted in until they explicitly turn it off.
  isActive() {
    return !document.cookie.split('; ').some((c) => c === 'after_dark=0');
  }

  render() {
    if (!this.hasButtonTarget) return;
    this.buttonTarget.textContent = this.active
      ? '🌙 After Dark · ON'
      : '🌙 After Dark';
    this.buttonTarget.classList.toggle(
      'c-utility-bar__after-dark--on',
      this.active
    );
  }
}
