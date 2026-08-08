// A toast dispatched immediately before a Turbo visit dies with the old body.
// Parking it in sessionStorage lets the toast controller pick it up once the
// new page has connected.
const KEY = 'toast:pending';

export function queueToast(message, duration) {
  sessionStorage.setItem(KEY, JSON.stringify({ message, duration }));
}

export function takeToast() {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  sessionStorage.removeItem(KEY);

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
