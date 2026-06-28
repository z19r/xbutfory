import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  select(event) {
    const key = event.currentTarget.dataset.sortKey
    const url = new URL(window.location)
    url.searchParams.set("sort", key)
    url.searchParams.delete("page")
    Turbo.visit(url.toString(), { action: "replace" })
  }
}
