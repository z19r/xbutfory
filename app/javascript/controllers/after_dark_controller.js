import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  connect() {
    this.active = this.isActive()
    this.render()
  }

  toggle() {
    this.active = !this.active
    document.cookie = `after_dark=${this.active ? "1" : ""}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`

    const message = this.active
      ? "🔞 After Dark unlocked. You asked for it. No judgment."
      : "😇 Back to the safe-for-work zone."

    document.dispatchEvent(new CustomEvent("toast:show", { detail: { message, duration: 4500 } }))

    this.render()
    Turbo.visit(window.location.href, { action: "replace" })
  }

  // Logged-out visitors can't use After Dark — nudge them to sign in.
  promptSignIn(event) {
    event.preventDefault()
    document.dispatchEvent(new CustomEvent("auth-modal:open"))
  }

  isActive() {
    return document.cookie.split("; ").some(c => c === "after_dark=1")
  }

  render() {
    if (!this.hasButtonTarget) return
    this.buttonTarget.textContent = this.active ? "🌙 After Dark · ON" : "🌙 After Dark"
    this.buttonTarget.classList.toggle("c-utility-bar__after-dark--on", this.active)
  }
}
