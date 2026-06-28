import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["xInput", "yInput", "xDisplay", "yDisplay", "preview"]

  update() {
    const x = this.xInputTarget.value.trim() || "X"
    const y = this.yInputTarget.value.trim() || "Y"

    this.xDisplayTarget.textContent = x
    this.yDisplayTarget.textContent = y

    const formula = this.previewTarget.querySelector(".c-submit-preview__formula")
    if (formula) {
      const isPlaceholder = this.xInputTarget.value.trim() === "" || this.yInputTarget.value.trim() === ""
      formula.classList.toggle("c-submit-preview__formula--placeholder", isPlaceholder)
    }
  }
}
