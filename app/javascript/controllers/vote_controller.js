import { Controller } from "@hotwired/stimulus"

// Milestone toasts mirror the prototype's vote-count celebrations.
const MILESTONES = {
  5: "🏆 5 votes. It's catching on.",
  12: "🔥 12 votes. Officially trending in someone's mind."
}

export default class extends Controller {
  static targets = ["count", "button"]
  static values = { entryId: Number, voted: Boolean }
  static classes = ["active"]

  async toggle() {
    const token = document.querySelector('meta[name="csrf-token"]')?.content
    const response = await fetch(`/entries/${this.entryIdValue}/vote`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Accept": "application/json"
      }
    })

    if (!response.ok) return

    const data = await response.json()
    this.countTarget.textContent = data.votes_count
    this.votedValue = data.voted

    const activeClass = this.hasActiveClass ? this.activeClass : "c-card__vote--on"
    this.buttonTarget.classList.toggle(activeClass, data.voted)

    if (data.voted && MILESTONES[data.votes_count]) {
      document.dispatchEvent(new CustomEvent("toast:show", { detail: { message: MILESTONES[data.votes_count] } }))
    }
  }
}
