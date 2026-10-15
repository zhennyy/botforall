import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Process from './Process';

describe('Process', () => {
  it('показывает четыре шага работы по порядку', () => {
    render(<Process />);
    const steps = screen.getAllByRole('listitem').slice(0, 4);
    expect(steps.map((step) => step.querySelector('h4').textContent)).toEqual(['Задача', 'Разбор', 'Сборка', 'Запуск']);
    expect(steps.map((step) => step.querySelector('.num').textContent)).toEqual(['1', '2', '3', '4']);
  });

  it('последний шаг раскрывает и сворачивает варианты после запуска', async () => {
    const user = userEvent.setup();
    render(<Process />);
    const toggle = screen.getByRole('button', { name: /Запуск/ });
    const panel = document.getElementById('after-launch');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveTextContent('Подробнее');
    expect(panel).toHaveAttribute('inert');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveTextContent('Свернуть');
    expect(panel).not.toHaveAttribute('inert');
    expect(panel).toHaveAttribute('data-open', 'true');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(panel).toHaveAttribute('inert');
  });

  it('предлагает три формата после запуска', () => {
    render(<Process />);
    expect(screen.getByRole('heading', { name: 'После запуска — на выбор' })).toBeInTheDocument();
    for (const title of ['Хостинг у вас', 'Хостинг у меня', 'Без поддержки']) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(screen.getByText('По подписке')).toBeInTheDocument();
  });
});
