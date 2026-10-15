import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { intersectionObservers, mockMediaQueries } from '../test/browser-mocks';
import ParticlePlane from './ParticlePlane';

describe('ParticlePlane', () => {
  it('рисует частицы на canvas и запускает анимацию', () => {
    const requestFrame = vi.spyOn(window, 'requestAnimationFrame');
    const { container } = render(<ParticlePlane />);
    const canvas = container.querySelector('canvas.particle-plane');
    expect(canvas).toBeInTheDocument();
    expect(canvas.closest('.particle-plane-wrap')).toHaveAttribute('aria-hidden', 'true');
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
    expect(requestFrame).toHaveBeenCalled();
    expect(intersectionObservers.size).toBe(1);
  });

  it('при «уменьшить движение» рисует готовый самолётик без анимации', () => {
    mockMediaQueries('(prefers-reduced-motion: reduce)');
    const requestFrame = vi.spyOn(window, 'requestAnimationFrame');
    render(<ParticlePlane />);
    expect(requestFrame).not.toHaveBeenCalled();
    expect(intersectionObservers.size).toBe(0);
  });

  it('при удалении со страницы останавливает анимацию и наблюдателей', () => {
    const cancelFrame = vi.spyOn(window, 'cancelAnimationFrame');
    const { unmount } = render(<ParticlePlane />);
    unmount();
    expect(cancelFrame).toHaveBeenCalled();
    expect(intersectionObservers.size).toBe(0);
  });
});
