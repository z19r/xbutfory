import { Controller } from "@hotwired/stimulus"

// Swaps the single `--accent` theme knob and remembers the choice in a cookie
// so the server can re-apply it inline on the next render (no flash of magenta).
export default class extends Controller {
  static targets = ["swatch", "tray", "toggle"]
  static values = { open: { type: Boolean, default: false } }

  // The swatches live in a hidden tray; a small chevron slides it open.
  toggleTray() {
    this.openValue = !this.openValue
  }

  openValueChanged() {
    this.element.classList.toggle("c-utility-bar__theme--open", this.openValue)
    if (this.hasToggleTarget) {
      this.toggleTarget.setAttribute("aria-expanded", this.openValue ? "true" : "false")
    }
  }

  select({ params: { key, value } }) {
    document.documentElement.style.setProperty("--accent", value)
    document.cookie = `accent=${key}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`

    this.swatchTargets.forEach((swatch) => {
      const active = swatch.dataset.themeKeyParam === key
      swatch.classList.toggle("c-utility-bar__swatch--on", active)
      swatch.setAttribute("aria-pressed", active ? "true" : "false")
    })
  }
}
