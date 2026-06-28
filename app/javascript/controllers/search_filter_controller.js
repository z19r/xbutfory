import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]

  search() {
    clearTimeout(this._debounce)
    const raw = this.inputTarget.value
    const lc = raw.toLowerCase().trim()

    if (lc === "bacon") {
      document.dispatchEvent(new CustomEvent("toast:show", { detail: { message: '🥓 "Instagram but for Bacon" — added to the roadmap. Sincerely.', duration: 5000 } }))
    } else if (lc === "xbutfory") {
      document.dispatchEvent(new CustomEvent("toast:show", { detail: { message: "🌀 very meta. XbutforY but for XbutforY.", duration: 4000 } }))
    } else if (lc.includes("escort") || lc === "nsfw" || lc.includes("sex")) {
      document.dispatchEvent(new CustomEvent("toast:show", { detail: { message: "🌙 psst… flip the After Dark toggle up top.", duration: 4000 } }))
    }

    this._debounce = setTimeout(() => {
      const query = raw.trim()
      const url = new URL(window.location)
      if (query) {
        url.searchParams.set("q", query)
      } else {
        url.searchParams.delete("q")
      }
      url.searchParams.delete("page")
      Turbo.visit(url.toString(), { action: "replace" })
    }, 300)
  }
}
