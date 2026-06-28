import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input"]

  search() {
    clearTimeout(this._debounce)
    this._debounce = setTimeout(() => {
      const query = this.inputTarget.value.trim()
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
