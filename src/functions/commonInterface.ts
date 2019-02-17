//data when passed through the excel parser
export interface ICsvRowData {
  ["1960"]: string;
  ["1961"]: string;
  ["1962"]: string;
  ["1963"]: string;
  ["1964"]: string;
  ["1965"]: string;
  ["1966"]: string;
  ["1967"]: string;
  ["1968"]: string;
  ["1969"]: string;
  ["1970"]: string;
  ["1971"]: string;
  ["1972"]: string;
  ["1973"]: string;
  ["1974"]: string;
  ["1975"]: string;
  ["1976"]: string;
  ["1977"]: string;
  ["1978"]: string;
  ["1979"]: string;
  ["1980"]: string;
  ["1981"]: string;
  ["1982"]: string;
  ["1983"]: string;
  ["1984"]: string;
  ["1985"]: string;
  ["1986"]: string;
  ["1987"]: string;
  ["1988"]: string;
  ["1989"]: string;
  ["1990"]: string;
  ["1991"]: string;
  ["1992"]: string;
  ["1993"]: string;
  ["1994"]: string;
  ["1995"]: string;
  ["1996"]: string;
  ["1997"]: string;
  ["1998"]: string;
  ["1999"]: string;
  ["2000"]: string;
  ["2001"]: string;
  ["2002"]: string;
  ["2003"]: string;
  ["2004"]: string;
  ["2005"]: string;
  ["2006"]: string;
  ["2007"]: string;
  ["2008"]: string;
  ["2009"]: string;
  ["2010"]: string;
  ["2011"]: string;
  ["2012"]: string;
  ["2013"]: string;
  ["2014"]: string;
  ["2015"]: string;
  ["2016"]: string;
  ["2017"]: string;
  ["Country Name"]: string;
  ["Country Code"]: string;
  ["Indicator Name"]: string;
  ["Indicator Code"]: string;
}

export interface ICountry {
  // country information
  countryName: string;
  countryCode: string;
}
export interface IIndicator {
  // indicator information
  indicatorName: string;
  indicatorCode: string;
}
export interface IDate {
  // date information
  date: number;
}
export interface IDateAndData extends IDate {
  // date and value information
  value: number;
}
export interface ICsvDataRange extends IIndicator, ICountry {
  // build the interface for a one country
  dataToBeObserved: IDateAndData[];
}
