import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Contact from './Contact';

describe('Contact', () => {
  it('ссылка на Telegram открывает чат @BotFor_All в новой вкладке', () => {
    render(<Contact />);
    const telegram = screen.getByRole('link', { name: /@BotFor_All/ });
    expect(telegram).toHaveAttribute('href', 'https://t.me/BotFor_All');
    expect(telegram).toHaveAttribute('target', '_blank');
    expect(telegram).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('кнопка почты копирует адрес и на время показывает «Скопировано ✓»', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Contact />);
    const mailButton = screen.getByRole('button', { name: 'Скопировать адрес dogevev@gmail.com' });
    expect(mailButton).toHaveTextContent('Почта');

    await user.click(mailButton);
    await expect(navigator.clipboard.readText()).resolves.toBe('dogevev@gmail.com');
    expect(mailButton).toHaveTextContent('Скопировано ✓');
    expect(mailButton).toHaveClass('is-copied');

    act(() => vi.advanceTimersByTime(1800));
    expect(mailButton).toHaveTextContent('Почта');
    expect(mailButton).not.toHaveClass('is-copied');
  });

  it('если буфер обмена недоступен, показывает адрес в окне для ручного копирования', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('нет доступа'));
    const prompt = vi.spyOn(window, 'prompt').mockImplementation(() => null);
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: /Скопировать адрес/ }));
    expect(prompt).toHaveBeenCalledWith('Скопируйте адрес:', 'dogevev@gmail.com');
    expect(screen.getByRole('button', { name: /Скопировать адрес/ })).toHaveTextContent('Почта');
  });
});
