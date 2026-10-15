import { act, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { setIntersecting } from '../test/browser-mocks';
import TopoBg from './TopoBg';

describe('TopoBg', () => {
  it('рисует замкнутые линии уровня для двух вершин', () => {
    const { container } = render(<TopoBg />);
    const paths = container.querySelectorAll('path');
    expect(paths).toHaveLength(26 + 14);
    for (const path of paths) expect(path.getAttribute('d')).toMatch(/^M-?\d.*Z$/);
  });

  it('ставит анимацию на паузу, когда фон вне экрана', () => {
    const { container } = render(<TopoBg />);
    const background = container.querySelector('.topo-bg');
    expect(background).not.toHaveClass('is-paused');

    act(() => setIntersecting(background, false));
    expect(background).toHaveClass('is-paused');

    act(() => setIntersecting(background, true));
    expect(background).not.toHaveClass('is-paused');
  });
});
