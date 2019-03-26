const fs = require("fs");
const scraper = require("table-scraper");

let currentURL = "https://www.ssa.gov/oact/cola/bendpoints.html";

// Scrapes Social Security site to get WEP bendpoints based on birth year.

// This code saves manually copying the entire table, but updates will require
// some human editing to get the data necessary for the calculator, namely birth
// year and dollars in PIA (Primary Insurance Amount)

scraper.get(currentURL).then(function(tableData) {
  // Converts table data from objects to JSON
  JSON.stringify(tableData);

  // Writes JSON table to file.
  fs.writeFile("initial_bendpoints.txt", tableData, err => {
    if (err) throw err;
    console.log("The table has been saved!");
  });
});
