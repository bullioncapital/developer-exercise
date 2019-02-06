<?php

/**
 * Class searching for particular indicators
 */
class scriptSearch
{
    // Declaring constants here, hardcoding these only for this exercise
    // However these can be passed through arguments
    const COUNTRY_NAME_TEXT = 'countryName';
    const INDICATOR_NAME_TEXT = 'indicatorName';
    const YEAR_FROM_TEXT = 'yearFrom';
    const YEAR_TO_TEXT = 'yearTo';

    const COUNTRY_NAME_SEARCH = 'country name';
    const INDICATOR_NAME_SEARCH = 'indicator name';
    const YEAR_FROM_SEARCH = '1980';
    const YEAR_TO_SEARCH = '1990';

    const FILE_NAME = 'data.csv';
    const INDICATOR_1 = 'urban population growth (annual %)';
    const INDICATOR_2 = 'co2 emissions (kt)';

    /**
     * Start of the script
     */
    public function run()
    {
        // Checking if the csv file exists
        if (!file_exists(self::FILE_NAME)) {
            echo "File not found. \n";
            exit;
        }
        
        // Opening the csv file
        if (($file = fopen(self::FILE_NAME, 'r')) !== false) {
            // Looping through the csv file
            $row = 0;
            $headersPosition = $yearsAverage = $yearsAverageQuantity = [];
            
            $highestAverage = 0;
            $highestAverageCountry = '';
            
            while (($data = fgetcsv($file)) !== false) {
                $row++;
                if (empty($headersPosition)) {
                    $headersPosition = $this->getHeadersPosition($data);
                    // No need to look after rows before the header
                    continue;
                }

                // Check for info to search
                $indicatorName = strtolower($data[$headersPosition[self::INDICATOR_NAME_TEXT]]);

                // Evaluating indicator 1
                if ($indicatorName === self::INDICATOR_1) {
                    $yearFromPosition = $headersPosition[self::YEAR_FROM_TEXT];
                    $yearToPosition = $headersPosition[self::YEAR_TO_TEXT];
                    
                    // Calculating average (assuming there's only 1 of these rows for each country)
                    $sum = $quantity = 0;
                    for ($c = $yearFromPosition; $c <= $yearToPosition; $c++) {
                        $value = $data[$c];
                        if (empty($value)) {
                            // no need to account for values not provided
                            continue;
                        }
                        $sum += $value;
                        $quantity++;
                    }
                    // Checking if data was provided
                    if ($quantity !== 0) {
                        $average = $sum / $quantity;
                        if ($average > $highestAverage) {
                            $highestAverage = $average;
                            $highestAverageCountry = $data[$headersPosition[self::COUNTRY_NAME_TEXT]];
                        }
                    }
                }

                // Evaluating indicator 2
                if ($indicatorName === self::INDICATOR_2) {
                    for ($year = $yearFromPosition; $year <= $yearToPosition; $year++) {
                        $value = $data[$year];
                        if (empty($value)) {
                            // no need to account for values not provided
                            continue;
                        }

                        if (!isset($yearsAverage[$year])) {
                            $yearsAverage[$year] = 0;
                        }
                        $yearsAverage[$year] += $value;

                        if (!isset($yearsAverageQuantity[$year])) {
                            $yearsAverageQuantity[$year] = 0;
                        }
                        $yearsAverageQuantity[$year]++;
                    }
                }
            }
            fclose($file);

            // Printing results
            echo "\n";
            echo sprintf("Between %d and %d:\n", self::YEAR_FROM_SEARCH, self::YEAR_TO_SEARCH);
            // echo sprintf("Between %d and %d: <br>", self::YEAR_FROM_SEARCH, self::YEAR_TO_SEARCH);
            $this->buildResponse1($highestAverageCountry, $highestAverage);
            $this->buildResponse2($yearsAverage, $yearsAverageQuantity);
        }
    }

    /**
     * Identifies the position for the Country Name, Indicator Name, Year From and Year To
     * that will be used to get the necessary information
     * 
     * This function is created assuming that the order of these columns can change
     * and also assuming that years are sorted ascending 
     * 
     * Example of returned array:
     * (
     *   [countryName] => 0
     *   [indicatorName] => 2
     *   [yearFrom] => 24
     *   [yearTo] => 34
     * )
     * 
     * @param array $data
     * returns array
     */
    public function getHeadersPosition(array $data): array
    {
        $countryPosition = $indicatorPosition = $yearFromPosition = $yearToPosition = null;
        for ($position = 0; $position < count($data); $position++) {
            $value = strtolower(trim($data[$position]));

            // Searching for country position
            if (empty($countryPosition) && $value === self::COUNTRY_NAME_SEARCH) {
                $countryPosition = $position;
                continue;
            }

            // Searching for indicator position
            if (empty($indicatorPosition) && $value === self::INDICATOR_NAME_SEARCH) {
                $indicatorPosition = $position;
                continue;
            }

            // Searching for year from position
            if (empty($yearFromPosition) && $value === self::YEAR_FROM_SEARCH) {
                $yearFromPosition = $position;
                continue;
            }

            // Searching for year from position
            if (empty($yearToPosition) && $value === self::YEAR_TO_SEARCH) {
                $yearToPosition = $position;
                continue;
            }
        }

        // Checking if all headers position have been found
        if ($countryPosition !== null && $indicatorPosition !== null && $yearFromPosition !== null && $yearToPosition !== null) {
            return [
                self::COUNTRY_NAME_TEXT => $countryPosition,
                self::INDICATOR_NAME_TEXT => $indicatorPosition,
                self::YEAR_FROM_TEXT => $yearFromPosition,
                self::YEAR_TO_TEXT => $yearToPosition
            ];
        }

        return [];
    }

    /**
     * Prints results for the first question of this exercise.
     * 
     * Example:
     * -Botswana has the highest 'Urban population growth (annual %)' average: 12.318849545778
     * 
     * @param string $country: Country with highest average
     * @param float $average: Highest average
     */
    public function buildResponse1(string $country, float $average)
    {
        echo "-$country has the highest 'Urban population growth (annual %)' average: $average\n";
    }

    /**
     * Calculates and prints results for the second question of this exercise.
     * 
     * Example:
     * -1990 has the highest 'CO2 emissions (kt)' average: 757708.24095571
     * 
     * @param array $yearsAverage: Sum of all countries values for each year
     * @param array $yearsAverageQuantity: Quantity of values added of all countries values for each year
     */
    public function buildResponse2(array $yearsAverage, array $yearsAverageQuantity)
    {
        $highestAverage = 0;
        $highestAverageYear = '';

        $sum = 0;
        $yearsMapping = [];
        $yearMapped = self::YEAR_FROM_SEARCH;

        // Calculating average since now we have the info per year for all countries
        foreach ($yearsAverage as $year => $yearSum) {
            $yearsMapping[$year] = $yearMapped;

            $average = $yearSum / $yearsAverageQuantity[$year];
            if ($average > $highestAverage) {
                $highestAverage = $average;
                $highestAverageYear = $year;
            }

            $yearMapped++;
        }
        $yearResult = $yearsMapping[$year];

        echo "-$yearResult has the highest 'CO2 emissions (kt)' average: $highestAverage\n";
    }
    
}

// Running the script 
$scriptSearch = new scriptSearch;
$scriptSearch->run();

?>