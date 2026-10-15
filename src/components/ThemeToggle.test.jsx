import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { mockMediaQueries } from '../test/browser-mocks';
import ThemeToggle from './ThemeToggle';

const currentTheme = () => document.documentElement.getAttribute('data-theme');

describe('ThemeToggle', () => {
  it('без сохранённой темы берёт светлую или тёмную из настроек системы', () => {
    render(<ThemeToggle />);
    expect(currentTheme()).toBe('light');
  });

  it('тёмная тема системы — включает тёмную', () => {
    mockMediaQueries('(prefers-color-scheme: dark)');
    render(<ThemeToggle />);
    expect(currentTheme()).toBe('dark');
    expect(screen.getByRole('button')).toHaveAccessibleName('Включить светлую тему');
  });

  it('переключает data-theme и запоминает выбор', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: 'Включить тёмную тему' });

    await user.click(button);
    expect(currentTheme()).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(button).toHaveAccessibleName('Включить светлую тему');

    await user.click(button);
    expect(currentTheme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('сохранённая тема важнее системной', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    expect(currentTheme()).toBe('dark');
  });

  it('на телефоне тема всегда тёмная', async () => {
    mockMediaQueries('(max-width: 700px)');
    localStorage.setItem('theme', 'light');
    const user = userEvent.setup();
    render(<ThemeToggle />);
    expect(currentTheme()).toBe('dark');

    await user.click(screen.getByRole('button'));
    expect(currentTheme()).toBe('dark');
  });
});
