import { Controller } from "@hotwired/stimulus"

// Flips the submit CTA label when the listing tier changes. Selected-state styling is
// handled in CSS via :has(input:checked); this only owns the CTA copy.
export default class extends Controller {
  static targets = ["radio", "cta"]

  update() {
    const selected = this.radioTargets.find((r) => r.checked)
    const featured = selected && selected.value === "featured"
    this.ctaTarget.textContent = (featured ? "Launch for $1.99" : "Submit for free") + " →"
    this.ctaTarget.classList.toggle("c-submit__cta--featured", featured)
  }
}
