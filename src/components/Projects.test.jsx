import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Projects from './Projects';

const cardByTitle = (title) => screen.getByRole('heading', { level: 3, name: title }).closest('li');
const linksOf = (card) =>
  within(card)
    .queryAllByRole('link')
    .map((link) => [link.textContent, link.getAttribute('href')]);

describe('Projects', () => {
  it('показывает четыре карточки: у ботов заголовок — @ник, у ассистента — название', () => {
    render(<Projects />);
    const titles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
    expect(titles).toEqual(['@Fleeer_bot', '@RadiatorBZ_bot', '@CoFFeeeJD_bot', 'Ассистент']);
  });

  it('Флёр: демо, бот и код', () => {
    render(<Projects />);
    const card = cardByTitle('@Fleeer_bot');
    expect(within(card).getByText('Цветочный магазин')).toBeInTheDocument();
    expect(linksOf(card)).toEqual([
      ['Как это выглядит ↗', '/fleur-demo.html'],
      ['Открыть бота ↗', 'https://t.me/Fleeer_bot'],
      ['Код', 'https://github.com/zhennyy/flowerbot'],
    ]);
  });

  it('RadiatorPro: демо, бот и код', () => {
    render(<Projects />);
    expect(linksOf(cardByTitle('@RadiatorBZ_bot'))).toEqual([
      ['Как это выглядит ↗', '/radiator-demo.html'],
      ['Открыть бота ↗', 'https://t.me/RadiatorBZ_bot'],
      ['Код', 'https://github.com/zhennyy/radiatorbot'],
    ]);
  });

  it('CoFFeeJD: демо и бот, без ссылки на код', () => {
    render(<Projects />);
    expect(linksOf(cardByTitle('@CoFFeeeJD_bot'))).toEqual([
      ['Как это выглядит ↗', '/coffeejd-demo.html'],
      ['Открыть бота ↗', 'https://t.me/CoFFeeeJD_bot'],
    ]);
  });

  it('Ассистент: только код', () => {
    render(<Projects />);
    expect(linksOf(cardByTitle('Ассистент'))).toEqual([['Код', 'https://github.com/zhennyy/telegram-assistant-bot']]);
  });

  it('внешние ссылки открываются в новой вкладке, демо — на этом сайте', () => {
    render(<Projects />);
    for (const link of screen.getAllByRole('link')) {
      if (link.getAttribute('href').startsWith('https://')) {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      } else {
        expect(link).not.toHaveAttribute('target');
      }
    }
  });

  it('у каждой карточки есть теги и иконка', () => {
    const { container } = render(<Projects />);
    const cards = container.querySelectorAll('.work');
    expect(cards).toHaveLength(4);
    for (const card of cards) {
      expect(card.querySelectorAll('.tags span').length).toBeGreaterThan(0);
      expect(card.querySelector('.neon-ic svg')).toBeInTheDocument();
    }
    expect(within(cardByTitle('@CoFFeeeJD_bot')).getByText('Чеки 54-ФЗ')).toBeInTheDocument();
  });
});
