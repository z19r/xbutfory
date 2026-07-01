import { Controller } from "@hotwired/stimulus"

// After a long stretch of staring without moving, the editor checks in.
// Any pointer/key activity resets the clock; it fires at most once per idle spell.
const IDLE_MS = 55000
const CHECK_MS = 5000
const MESSAGE = "psst… still there? 👀 you've been staring a while."

export default class extends Controller {
  connect() {
    this.last = Date.now()
    this.bump = () => { this.last = Date.now() }
    document.addEventListener("mousemove", this.bump, { passive: true })
    document.addEventListener("keydown", this.bump)
    document.addEventListener("click", this.bump)
    document.addEventListener("scroll", this.bump, { passive: true })
    this.timer = setInterval(() => this.check(), CHECK_MS)
  }

  disconnect() {
    document.removeEventListener("mousemove", this.bump)
    document.removeEventListener("keydown", this.bump)
    document.removeEventListener("click", this.bump)
    document.removeEventListener("scroll", this.bump)
    clearInterval(this.timer)
  }

  check() {
    if (Date.now() - this.last < IDLE_MS) return
    document.dispatchEvent(new CustomEvent("toast:show", {
      detail: { message: MESSAGE, duration: 5000 }
    }))
    this.last = Date.now()
  }
}
