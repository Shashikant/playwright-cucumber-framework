import * as XLSX from 'xlsx';

interface ExcelRow {
  TCName: string;
  [key: string]: string | number | null;
}

let workbookCache: XLSX.WorkBook | null = null;
let currentFilePath: string | null = null;

// Cache parsed data per sheet, so repeat scenarios on the same sheet
// don't re-parse it every time
const sheetDataCache: Record<string, ExcelRow[]> = {};

export function loadExcel(filePath: string): void {
  if (!workbookCache || currentFilePath !== filePath) {
    workbookCache = XLSX.readFile(filePath);
    currentFilePath = filePath;
  }
}

function getSheetData(sheetName: string): ExcelRow[] {
  if (!workbookCache) {
    throw new Error('Workbook not loaded — call loadWorkbook() first');
  }

  if (sheetDataCache[sheetName]) {
    return sheetDataCache[sheetName];
  }

  const sheet = workbookCache.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in ${currentFilePath}`);
  }

  const data = XLSX.utils.sheet_to_json<ExcelRow>(sheet);
  sheetDataCache[sheetName] = data;
  return data;
}

export function getExcelDataByTC(tcName: string, sheetName: string): ExcelRow {
  const sheetData = getSheetData(sheetName);
  const row = sheetData.find((r) => r.TCName === tcName);

  if (!row) {
    throw new Error(`No test data found for TCName: "${tcName}" in sheet "${sheetName}"`);
  }

  return cleanRow(row);
}

function cleanRow(row: ExcelRow): ExcelRow {
  const cleaned: ExcelRow = { ...row };
  Object.keys(cleaned).forEach((key) => {
    if (cleaned[key] === undefined || cleaned[key] === '') {
      cleaned[key] = null;
    }
  });
  return cleaned;
}