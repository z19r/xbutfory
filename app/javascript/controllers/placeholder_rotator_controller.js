import { Controller } from "@hotwired/stimulus"

// Cycles the search field's placeholder through a set of deadpan "X but for Y"
// prompts. Mechanical, no fade — and it backs off the moment the field is
// focused or typed into, and never runs under prefers-reduced-motion.
export default class extends Controller {
  static targets = ["input"]
  static values = {
    phrases: Array,
    interval: { type: Number, default: 3400 }
  }

  connect() {
    if (this.prefersReducedMotion || this.phrasesValue.length < 2) return
    this.index = 0
    this.timer = setInterval(() => this.rotate(), this.intervalValue)
  }

  disconnect() {
    this.stop()
  }

  rotate() {
    if (!this.hasInputTarget) return
    if (this.inputTarget.value || document.activeElement === this.inputTarget) return
    this.index = (this.index + 1) % this.phrasesValue.length
    this.inputTarget.setAttribute("placeholder", this.phrasesValue[this.index])
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  get prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }
}
