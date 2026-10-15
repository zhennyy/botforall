import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { intersectionObservers, setIntersecting } from '../test/browser-mocks';
import Reveal from './Reveal';

describe('Reveal', () => {
  it('рендерит нужный тег с классами и атрибутами', () => {
    render(
      <Reveal as="ul" className="works" data-testid="block">
        <li>пункт</li>
      </Reveal>,
    );
    const block = screen.getByTestId('block');
    expect(block.tagName).toBe('UL');
    expect(block).toHaveClass('reveal', 'works');
    expect(block).not.toHaveClass('is-in');
    expect(screen.getByText('пункт')).toBeInTheDocument();
  });

  it('показывает блок при первом попадании на экран и перестаёт следить', () => {
    render(<Reveal data-testid="block">текст</Reveal>);
    const block = screen.getByTestId('block');

    act(() => setIntersecting(block, false));
    expect(block).not.toHaveClass('is-in');

    act(() => setIntersecting(block, true));
    expect(block).toHaveClass('is-in');
    expect(intersectionObservers.size).toBe(0);
  });

  it('без IntersectionObserver блок виден сразу', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    delete globalThis.IntersectionObserver;
    render(<Reveal data-testid="block">текст</Reveal>);
    expect(screen.getByTestId('block')).toHaveClass('is-in');
  });
});
