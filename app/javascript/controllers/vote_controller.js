import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["count", "button"]
  static values = { entryId: Number, voted: Boolean }

  async toggle() {
    const token = document.querySelector('meta[name="csrf-token"]')?.content
    const response = await fetch(`/entries/${this.entryIdValue}/vote`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Accept": "application/json"
      }
    })

    if (response.ok) {
      const data = await response.json()
      this.countTarget.textContent = data.votes_count
      this.votedValue = data.voted
      this.buttonTarget.classList.toggle("c-entry-card__vote-btn--voted", data.voted)
    }
  }
}
