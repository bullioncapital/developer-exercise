import Indicator from './Indicator';

describe('Indicator:', () => {
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


  test('initiate correctly', () => {
    expect(indicator.name).toBe(name);
    expect(indicator.code).toBe(code);
  });

  test('add data', () => {
    mockData.forEach((data) => {
      indicator.addData(data[0], data[1]);
    });
    expect(indicator.data).not.toBeUndefined();
  });

  test('get data', () =>{
    expect(indicator.getData(mockData[0][0])).toBe(mockData[0][1]);
    expect(indicator.getData(1988)).toBeUndefined();
  });

  test('get highest data', () => {
    expect(indicator.getHighestData()).toEqual([1989, 3.148036])
  })
});
