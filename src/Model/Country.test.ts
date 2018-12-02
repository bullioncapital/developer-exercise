import Country from './Country';
import Indicator from './Indicator';
jest.mock('./Indicator');

describe('Country', () => {
  const mockData = [
    [1989, 3.148036],
    [1990, 2.2381],
    [1991, 1.4096],
    [1992, 0.84096],
    [1993, 0.44096]
  ];
  const name = 'Population growth (annual %)';
  const code = 'SP.POP.GROW';
  const indicator = new Indicator(name, code);
  const country = new Country('Aruba', 'ABW');

  test('initiate correctly', () => {
    expect(country.name).toBe('Aruba');
    expect(country.code).toBe('ABW');
  });

  test('add/get indicator', () => {
    country.addIndicator(code, indicator);

    expect(country.getIndicator(code)).toBe(indicator);
  });

});
