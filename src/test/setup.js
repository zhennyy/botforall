// Общая подготовка тестов: матчеры jest-dom, подмены браузерных API, очистка после каждого теста.
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import {
  MockIntersectionObserver,
  createCanvasContextStub,
  installMatchMedia,
  intersectionObservers,
} from './browser-mocks';

beforeEach(() => {
  installMatchMedia();
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => createCanvasContextStub());
});

afterEach(() => {
  cleanup();
  intersectionObservers.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});
