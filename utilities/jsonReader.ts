import fs from 'fs';


export function getTestData(path:string, testCaseName: string) {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'));

  return data[testCaseName];
}