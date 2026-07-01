import { Controller } from "@hotwired/stimulus"

// Swaps the single `--accent` theme knob and remembers the choice in a cookie
// so the server can re-apply it inline on the next render (no flash of magenta).
export default class extends Controller {
  static targets = ["swatch"]

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
