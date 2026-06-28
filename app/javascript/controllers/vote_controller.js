import { Controller } from '@hotwired/stimulus';

// Milestone toasts mirror the prototype's vote-count celebrations.
const MILESTONES = {
  5: '🏆 Five upvotes deep. You have taste. We respect that.',
  12: '🔥 Twelve votes. Okay, the board is basically yours now.',
};

export default class extends Controller {
  static targets = ['count', 'button'];
  static values = { entryId: Number, voted: Boolean };
  static classes = ['active'];

  async toggle() {
    const token = document.querySelector('meta[name="csrf-token"]')?.content;
    const response = await fetch(`/entries/${this.entryIdValue}/vote`, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        Accept: 'application/json',
      },
    });

    if (response.status === 401) {
      document.dispatchEvent(
        new CustomEvent('toast:show', {
          detail: {
            message: '🔒 Sign in to vote — it keeps the ballots honest.',
          },
        })
      );
      return;
    }
    if (!response.ok) return;

    const data = await response.json();
    this.countTarget.textContent = data.votes_count;
    this.votedValue = data.voted;

    const activeClass = this.hasActiveClass
      ? this.activeClass
      : 'c-card__vote--on';
    this.buttonTarget.classList.toggle(activeClass, data.voted);

    if (data.voted && MILESTONES[data.votes_count]) {
      document.dispatchEvent(
        new CustomEvent('toast:show', {
          detail: { message: MILESTONES[data.votes_count] },
        })
      );
    }
  }
}
