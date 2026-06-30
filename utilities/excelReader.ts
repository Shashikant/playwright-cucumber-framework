import * as XLSX from 'xlsx';

let testData: any[] = [];

// ✅ Load Excel once
export function loadExcel(filePath: string, sheetName: string) {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];

  testData = XLSX.utils.sheet_to_json(sheet);
}

// ✅ Get data based on TCName
export function getExcelDataByTC(tcName: string) {
  const data = testData.find((row) => row.TCName === tcName);

  if (!data) {
    throw new Error(`No test data found for TCName: ${tcName}`);
  }

  return cleanRow(data);
}

// ✅ Optional: Clean empty values
function cleanRow(row: any) {
  Object.keys(row).forEach((key) => {
    if (row[key] === undefined || row[key] === '') {
      row[key] = null;
    }
  });
  return row;
}