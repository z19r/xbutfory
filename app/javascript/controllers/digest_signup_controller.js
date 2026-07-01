import { Controller } from "@hotwired/stimulus"

// Weekly-digest capture. The form posts to DigestSubscriptionsController via Turbo;
// we react to the result here — confirm via the global toast and reset the field.
export default class extends Controller {
  static targets = ["email"]

  subscribed(event) {
    if (!event.detail.success) {
      document.dispatchEvent(
        new CustomEvent("toast:show", {
          detail: { message: "That email didn't look right. Try again?" }
        })
      )
      return
    }

    document.dispatchEvent(
      new CustomEvent("toast:show", {
        detail: { message: "📬 You're on the list. The 10 best, every Sunday." }
      })
    )

    if (this.hasEmailTarget) this.emailTarget.value = ""
  }
}
