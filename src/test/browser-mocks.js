// Подмены браузерных API, которых нет в jsdom: matchMedia, IntersectionObserver, canvas.
import { vi } from 'vitest';

// matchMedia: по умолчанию ни один медиазапрос не совпадает; mockMediaQueries('(max-width: 700px)') — включить нужные
let matchingQueries = [];
export const mockMediaQueries = (...queries) => {
  matchingQueries = queries;
};
export function installMatchMedia() {
  matchingQueries = [];
  window.matchMedia = vi.fn((query) => ({
    matches: matchingQueries.includes(query),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

// IntersectionObserver: наблюдатели запоминаются, а «появление на экране» тест вызывает сам
export const intersectionObservers = new Set();
export class MockIntersectionObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.elements = [];
    intersectionObservers.add(this);
  }
  observe(element) {
    this.elements.push(element);
  }
  unobserve(element) {
    this.elements = this.elements.filter((observed) => observed !== element);
  }
  disconnect() {
    this.elements = [];
    intersectionObservers.delete(this);
  }
  takeRecords() {
    return [];
  }
}
/** Сообщить всем наблюдателям за элементом, что он появился (или пропал) с экрана */
export function setIntersecting(element, isIntersecting) {
  for (const observer of [...intersectionObservers]) {
    if (observer.elements.includes(element)) observer.callback([{ target: element, isIntersecting }], observer);
  }
}

// canvas: 2D-контекст, у которого любой метод ничего не делает (ParticlePlane только рисует)
export function createCanvasContextStub() {
  const gradient = { addColorStop: vi.fn() };
  return new Proxy(
    {},
    {
      get: (target, name) => {
        if (name in target) return target[name];
        if (name === 'createRadialGradient') return () => gradient;
        return vi.fn();
      },
    },
  );
}
