import { Controller } from '@hotwired/stimulus';

// The StartupBar widget pins a bar to the top of the viewport and pads the
// body by its height. That padding is the only honest signal that the bar
// actually rendered: the server flag says we asked for the widget, not that
// it arrived, and a third-party embed can be blocked, fail to load, or have
// nothing to show. Mirror the real padding into --startupbar-h so the sticky
// nav sits flush with the top whenever no bar is there.
export default class extends Controller {
  connect() {
    this.sync = this.sync.bind(this);
    this.schedule = this.schedule.bind(this);

    this.sync();

    // The loader injects its markup and styles asynchronously, so watch for
    // both rather than assuming either shape.
    this.observer = new MutationObserver(this.schedule);
    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      childList: true,
      subtree: true,
    });

    window.addEventListener('load', this.sync);
    window.addEventListener('resize', this.schedule);
  }

  disconnect() {
    this.observer?.disconnect();
    window.removeEventListener('load', this.sync);
    window.removeEventListener('resize', this.schedule);
    cancelAnimationFrame(this._frame);
  }

  // Mutations arrive in bursts while the widget renders; measure once per
  // frame instead of on every record.
  schedule() {
    cancelAnimationFrame(this._frame);
    this._frame = requestAnimationFrame(this.sync);
  }

  sync() {
    const padding = parseFloat(getComputedStyle(document.body).paddingTop);
    const height = Number.isFinite(padding) && padding > 0 ? padding : 0;

    document.documentElement.style.setProperty('--startupbar-h', `${height}px`);
  }
}
