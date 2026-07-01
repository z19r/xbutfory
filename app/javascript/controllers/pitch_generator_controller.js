import { Controller } from '@hotwired/stimulus';

// Fills the one-line pitch field with an AI-generated line based on the X and
// Y already typed into the submit form. Degrades to a toast on any failure.
export default class extends Controller {
  static targets = ['field', 'button'];

  async generate() {
    const form = this.element.closest('form');
    const x = form.querySelector('[name="entry[x]"]')?.value.trim();
    const y = form.querySelector('[name="entry[y]"]')?.value.trim();

    if (!x || !y) {
      this.toast('Fill in the X and the Y first.');
      return;
    }

    const label = this.buttonTarget.textContent;
    this.buttonTarget.disabled = true;
    this.buttonTarget.textContent = 'Generating…';

    try {
      const response = await fetch('/pitch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')
            ?.content,
        },
        body: JSON.stringify({ x, y }),
      });
      const data = await response.json();

      if (response.ok && data.pitch) {
        this.fieldTarget.value = data.pitch;
        this.fieldTarget.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        this.toast(data.error || 'Could not generate a pitch.');
      }
    } catch {
      this.toast('Could not reach the pitch generator.');
    } finally {
      this.buttonTarget.disabled = false;
      this.buttonTarget.textContent = label;
    }
  }

  toast(message) {
    document.dispatchEvent(new CustomEvent('toast:show', { detail: { message } }));
  }
}
