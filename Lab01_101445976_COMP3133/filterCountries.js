const fs = require('fs');
const csv = require('csv-parser');

// File names
const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// 1. Delete existing files if they exist
[canadaFile, usaFile].forEach((file) => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`${file} deleted.`);
    }
});

// 2. Create writable streams for canada.txt and usa.txt
const canadaStream = fs.createWriteStream(canadaFile);
const usaStream = fs.createWriteStream(usaFile);

// 3. Write headers to both output files
canadaStream.write('country,year,population\n');
usaStream.write('country,year,population\n');

// 4. Read and filter data from the CSV
fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        // Filter and write Canada data
        if (row.country.toLowerCase() === 'canada') {
            canadaStream.write(`${row.country},${row.year},${row.population}\n`);
        }
        // Filter and write USA data
        else if (row.country.toLowerCase() === 'united states') {
            usaStream.write(`${row.country},${row.year},${row.population}\n`);
        }
    })
    .on('end', () => {
        console.log('CSV file processed.');
        // Close streams
        canadaStream.end();
        usaStream.end();
    })
    .on('error', (err) => {
        console.error('Error reading CSV:', err.message);
    });
