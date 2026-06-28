import { Controller } from "@hotwired/stimulus"

// Weekly-digest capture. No backend yet (Part 1 is visual): on submit we optimistically
// confirm via the global toast and reset the field. Wire to a real endpoint later.
export default class extends Controller {
  static targets = ["email"]

  subscribe(event) {
    event.preventDefault()
    const email = this.hasEmailTarget ? this.emailTarget.value.trim() : ""
    if (!email) return

    document.dispatchEvent(
      new CustomEvent("toast:show", {
        detail: { message: "📬 You're on the list. The 10 best, every Sunday." }
      })
    )

    if (this.hasEmailTarget) this.emailTarget.value = ""
  }
}
