import { Controller } from '@hotwired/stimulus';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];
const COUPON_CODE = 'XBUTFORY-K0N4M1';

export default class extends Controller {
  static targets = ['canvas', 'modal', 'backdrop'];

  connect() {
    this.buffer = [];
    this._onKey = (e) => {
      if (e.key === 'Escape' && this.celebrating) {
        this.close();
        return;
      }
      this.buffer = this.buffer.concat([e.key]).slice(-10);
      if (this.buffer.join(',') === SEQUENCE.join(',')) {
        this.celebrate();
      }
    };
    document.addEventListener('keydown', this._onKey);
  }

  disconnect() {
    document.removeEventListener('keydown', this._onKey);
    this.stopFireworks();
  }

  celebrate() {
    if (this.celebrating) return;
    this.celebrating = true;
    this.buffer = [];

    // Reduced motion: skip the fireworks canvas entirely and hand over the
    // reward straight away. The coupon is the payoff; the pyrotechnics are not.
    if (this.prefersReducedMotion) {
      this.canvasTarget.hidden = true;
      this.backdropTarget.hidden = false;
      this.modalTarget.hidden = false;
      requestAnimationFrame(() => {
        this.backdropTarget.classList.add('c-konami__backdrop--visible');
        this.modalTarget.classList.add('c-konami__modal--visible');
      });
      return;
    }

    this.backdropTarget.hidden = false;
    this.canvasTarget.hidden = false;
    this.modalTarget.hidden = true;

    requestAnimationFrame(() => {
      this.backdropTarget.classList.add('c-konami__backdrop--visible');
      this.startFireworks();
    });

    this._showModal = setTimeout(() => {
      this.stopFireworks();
      this.canvasTarget.hidden = true;
      this.modalTarget.hidden = false;
      requestAnimationFrame(() => {
        this.modalTarget.classList.add('c-konami__modal--visible');
      });
    }, 3500);
  }

  close() {
    this.stopFireworks();
    clearTimeout(this._showModal);
    this.celebrating = false;
    this.backdropTarget.classList.remove('c-konami__backdrop--visible');
    this.modalTarget.classList.remove('c-konami__modal--visible');
    this.canvasTarget.hidden = true;
    setTimeout(() => {
      this.backdropTarget.hidden = true;
      this.modalTarget.hidden = true;
    }, 250);
  }

  copy() {
    navigator.clipboard.writeText(COUPON_CODE).then(() => {
      document.dispatchEvent(
        new CustomEvent('toast:show', {
          detail: { message: '📋 Copied to clipboard.' },
        })
      );
    });
  }

  claim() {
    this.close();
    Turbo.visit('/submit');
  }

  startFireworks() {
    const canvas = this.canvasTarget;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const particles = [];
    const colors = [
      '#E11D8F',
      '#C93B1B',
      '#D98A2B',
      '#2E8B8B',
      '#3A6EA5',
      '#6A3D9E',
      '#F3EDE3',
    ];

    const launch = () => {
      const cx = w * (0.2 + 0.6 * (((particles.length * 7) % 11) / 11));
      const cy = h * (0.15 + 0.3 * (((particles.length * 3) % 7) / 7));
      for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 * i) / 40;
        const speed = 2 + 4 * (((i * 13) % 7) / 7);
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.012 + 0.008 * (((i * 7) % 5) / 5),
          color: colors[i % colors.length],
          size: 2 + (i % 3),
        });
      }
    };

    let frame = 0;
    this._fwLaunching = true;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      if (this._fwLaunching && frame % 30 === 0) launch();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.vx *= 0.98;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      frame++;
      this._fwRaf = requestAnimationFrame(tick);
    };

    tick();
    setTimeout(() => {
      this._fwLaunching = false;
    }, 3000);
  }

  stopFireworks() {
    cancelAnimationFrame(this._fwRaf);
    this._fwLaunching = false;
  }

  get prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
