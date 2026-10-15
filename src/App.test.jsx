import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('собирает страницу из всех секций по порядку', () => {
    const { container } = render(<App />);
    const sectionIds = [...container.querySelectorAll('header[id], section[id]')].map((section) => section.id);
    expect(sectionIds).toEqual(['top', 'process', 'benefits', 'projects', 'contact']);
    expect(screen.getByRole('navigation', { name: 'Основное меню' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('у каждой ссылки меню есть секция, куда она ведёт', () => {
    const { container } = render(<App />);
    for (const link of container.querySelectorAll('a[href^="#"]')) {
      expect(container.querySelector(link.getAttribute('href'))).toBeInTheDocument();
    }
  });
});
