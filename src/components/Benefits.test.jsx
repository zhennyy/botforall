import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Benefits from './Benefits';

describe('Benefits', () => {
  it('перечисляет шесть возможностей бота', () => {
    render(<Benefits />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Всё для продаж — в одном боте');
    const titles = screen.getAllByRole('heading', { level: 4 }).map((heading) => heading.textContent);
    expect(titles).toEqual(['Витрина', 'Оплата', 'Доставка', 'Админка', 'Чат', 'Поддержка']);
    expect(screen.getByText(/ЮKassa. Каждый платёж проверяется на сервере/)).toBeInTheDocument();
  });
});
