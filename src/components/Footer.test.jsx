import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('ведёт на условия использования и политику конфиденциальности', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Условия использования' })).toHaveAttribute('href', '/terms.html');
    expect(screen.getByRole('link', { name: 'Политика обработки персональных данных' })).toHaveAttribute(
      'href',
      '/privacy.html',
    );
  });

  it('показывает текущий год', () => {
    render(<Footer />);
    expect(screen.getByText(`© ${new Date().getFullYear()} botforall.ru. Все права защищены.`)).toBeInTheDocument();
  });
});
