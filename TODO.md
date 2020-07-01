## Quick start:
backend & frontend: npm start

## Test:
backend & frontend: npm test

## Implementation:
Backend:
The cache layer keeps data in key (FMID) and value (single row) pairs.
For each request it'll always query database for corresponding FMIDs first,
Then try to hit the cache.
The pagination based on the first/last row's FMID in current page.

## TODO:
Backend:
Update/delete data with cache update/invalidate;
Config file;
More test cases;

Frontend:
Filter on multiple columns;
Adjustable page size;
UI beautify: since the table row is quite long, there should be a second level
form for all the details, and the initial table only display important columns.
Error handling;
Config file;
Fix test cases: something wrong with react testing library's 'waitFor' function..