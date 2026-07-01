import { Controller } from "@hotwired/stimulus"

const LOGO_YS = ["Y", "Cats", "Lawyers", "Nuns", "Horses", "Bodegas", "Grandmas", "Pirates", "Gen Z", "your HOA", "Monks", "Dentists"]

export default class extends Controller {
  static targets = ["letter"]
  static values = { index: { type: Number, default: 0 } }

  cycle(event) {
    event.stopPropagation()
    this.indexValue = (this.indexValue + 1) % LOGO_YS.length
    const word = LOGO_YS[this.indexValue]
    this.letterTarget.textContent = word
    if (this.indexValue > 0) {
      this.letterTarget.style.marginLeft = "0.07em"
    } else {
      this.letterTarget.style.marginLeft = ""
    }
    this.dispatch("toast", { detail: { message: `“X but for ${word}” — someone’s probably building it` } })
    document.dispatchEvent(new CustomEvent("toast:show", { detail: { message: `“X but for ${word}” — someone’s probably building it` } }))
  }

  goHome() {
    Turbo.visit("/", { action: "replace" })
  }
}
