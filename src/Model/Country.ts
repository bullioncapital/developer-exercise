import Indicator from './Indicator';

export default class Country {
  public code: string;
  public name: string;
  private indicators: { [k: string]: Indicator } | undefined;

  public constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }

  /**
   *
   * @param {string} indicatorCode
   */
  getIndicator(indicatorCode: string): Indicator;
  getIndicator(indicatorCode: string): void;
  public getIndicator(indicatorCode: string): Indicator | void {
    if (this.indicators && this.indicators[indicatorCode] !== undefined) {
      return this.indicators[indicatorCode];
    }
    return;
  }

  public addIndicator(indicatorCode: string, indicator: Indicator): void {
    if (!this.indicators) {
      this.indicators = {};
    }
    this.indicators[indicatorCode] = indicator;
  }
}
