import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Nav from './Nav';

describe('Nav', () => {
  it('ссылается на секции страницы', () => {
    render(<Nav />);
    const menu = screen.getByRole('navigation', { name: 'Основное меню' });
    const links = within(menu).getAllByRole('link');
    expect(links.map((link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['Процесс', '#process'],
      ['Проекты', '#projects'],
      ['Контакты', '#contact'],
    ]);
  });

  it('содержит переключатель темы', () => {
    render(<Nav />);
    expect(screen.getByRole('button', { name: /тему/ })).toBeInTheDocument();
  });
});
