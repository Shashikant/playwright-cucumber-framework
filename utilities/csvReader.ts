import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

export function getCSVTestData(filePath: string, testCaseName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const resolvedPath = path.resolve(filePath);

    if (!fs.existsSync(resolvedPath)) {
      return reject(new Error(`CSV file not found at path: ${resolvedPath}`));
    }

    let foundData: any = null;

    fs.createReadStream(resolvedPath)
      .pipe(
        csv({
          mapHeaders: ({ header }) => header.replace(/^\uFEFF/, '').trim(), // strip BOM + whitespace from headers
          mapValues: ({ value }) => value?.trim(),                           // strip whitespace from all values
        })
      )
      .on('data', (row) => {
        if (row.tcname === testCaseName.trim()) {
          foundData = row;
        }
      })
      .on('end', () => {
        if (foundData) {
          resolve(foundData);
        } else {
          reject(new Error(`Test data not found for: "${testCaseName}" in ${resolvedPath}`));
        }
      })
      .on('error', (err) => reject(new Error(`CSV read error: ${err.message}`)));
  });
}