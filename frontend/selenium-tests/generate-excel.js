import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const RESULT_DIR = path.resolve('Test Results');
const EXCEL_DIR = path.join(RESULT_DIR, 'Excel');
const HTML_DIR = path.join(RESULT_DIR, 'HTML');
const SUMMARY_DIR = path.join(RESULT_DIR, 'Summary');

// Ensure directories exist
[EXCEL_DIR, SUMMARY_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function generateReports() {
  const mochawesomeFile = path.join(HTML_DIR, 'mochawesome.json');
  if (!fs.existsSync(mochawesomeFile)) {
    console.error('Mochawesome JSON not found:', mochawesomeFile);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(mochawesomeFile, 'utf8'));
  const stats = data.stats;
  const results = data.results[0].suites[0].tests;

  // Generate Excel
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Automation_Test_Report');
  
  sheet.columns = [
    { header: 'Test Name', key: 'title', width: 40 },
    { header: 'Status', key: 'state', width: 15 },
    { header: 'Duration (ms)', key: 'duration', width: 15 },
    { header: 'Error', key: 'error', width: 50 },
  ];

  results.forEach(test => {
    sheet.addRow({
      title: test.title,
      state: test.state,
      duration: test.duration,
      error: test.err?.message || ''
    });
  });

  await workbook.xlsx.writeFile(path.join(EXCEL_DIR, 'Automation_Test_Report.xlsx'));
  console.log('Excel report generated.');

  // Generate Summary MD
  const summaryMd = `# Live GitHub Pages E2E Test Summary

Deployment URL:
${process.env.BASE_URL || 'N/A'}

Total Tests: ${stats.tests}
Passed: ${stats.passes}
Failed: ${stats.failures}
Skipped: ${stats.pending}
Pass Percentage: ${stats.passPercent.toFixed(2)}%

Failed Tests:
${results.filter(t => t.state === 'failed').map(t => `- ${t.title}\n  - Failure Reason: ${t.err?.message}`).join('\n') || 'None'}
`;

  fs.writeFileSync(path.join(SUMMARY_DIR, 'summary.md'), summaryMd);
  
  // Output for GitHub Actions Summary
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryMd);
  }
  
  console.log('Summary report generated.');
}

generateReports().catch(err => {
  console.error(err);
  process.exit(1);
});
