import formatDateToDDMMYYYY from './formatDateToDDMMYYYY';

describe('formatDateToDDMMYYYY', () => {
  it('devrait formater une date ISO en dd/mm/AAAA', () => {
    const isoDate = '2026-01-06T22:26:46.339Z';
    const expected = '06/01/2026';

    expect(formatDateToDDMMYYYY(isoDate)).toBe(expected);
  });

  it('devrait fonctionner avec un objet Date', () => {
    const date = new Date('2026-01-06T22:26:46.339Z');
    const expected = '06/01/2026';

    expect(formatDateToDDMMYYYY(date)).toBe(expected);
  });

  it('devrait ajouter des zéros pour les jours et mois < 10', () => {
    const isoDate = '2026-03-05T12:00:00.000Z';
    const expected = '05/03/2026';

    expect(formatDateToDDMMYYYY(isoDate)).toBe(expected);
  });
});
