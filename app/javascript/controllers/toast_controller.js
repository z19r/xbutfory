import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container", "message"]

  connect() {
    if (this.messageTarget.textContent.trim()) {
      this.show()
    }
  }

  show(message) {
    if (message) {
      this.messageTarget.textContent = message
    }
    this.containerTarget.hidden = false
    requestAnimationFrame(() => {
      this.containerTarget.classList.add("c-toast--visible")
    })
    this.autoHideTimer = setTimeout(() => this.dismiss(), 4000)
  }

  dismiss() {
    clearTimeout(this.autoHideTimer)
    this.containerTarget.classList.remove("c-toast--visible")
    setTimeout(() => {
      this.containerTarget.hidden = true
    }, 180)
  }
}
