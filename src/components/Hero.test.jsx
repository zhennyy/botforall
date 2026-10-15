import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Hero from './Hero';

describe('Hero', () => {
  it('показывает заголовок, подзаголовок и кнопки к заявке и проектам', () => {
    const { container } = render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Магазин в Telegram, который продаёт сам.');
    expect(screen.getByText('Telegram-боты на заказ')).toBeInTheDocument();
    expect(screen.getByText('Витрина, оплата, доставка и админка в одном боте.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Заказать бота' })).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('link', { name: 'Смотреть проекты' })).toHaveAttribute('href', '#projects');
    expect(container.querySelector('.topo-bg svg')).toBeInTheDocument();
    expect(container.querySelector('canvas.particle-plane')).toBeInTheDocument();
  });
});
