import { Controller } from "@hotwired/stimulus"

// The footer's 🔮 easter egg: swap every entry's Y value for another at random,
// then put them all back on a second press. The "X but for" half stays put — only
// the Y text node (the last text node inside each title) gets shuffled.
const TOAST = "🔮 Y-values scrambled. Find the hidden genius in the chaos."

export default class extends Controller {
  toggle() {
    const nodes = Array.from(document.querySelectorAll(".c-card__title"))
      .map((title) => this.yNode(title))
      .filter(Boolean)
    if (nodes.length < 2) return

    if (this.original) {
      nodes.forEach((node, i) => {
        if (this.original[i] != null) node.textContent = this.original[i]
      })
      this.original = null
      return
    }

    this.original = nodes.map((node) => node.textContent)
    const shuffled = this.shuffle(this.original.slice())
    nodes.forEach((node, i) => { node.textContent = shuffled[i] })

    document.dispatchEvent(new CustomEvent("toast:show", {
      detail: { message: TOAST, duration: 3800 }
    }))
  }

  // The Y text is the last non-empty text node in the title (after the "but for" span).
  yNode(title) {
    const host = title.querySelector(".c-card__title-link") || title
    for (let i = host.childNodes.length - 1; i >= 0; i--) {
      const node = host.childNodes[i]
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return node
    }
    return null
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }
}
