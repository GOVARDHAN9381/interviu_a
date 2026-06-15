import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('Test Results', 'Screenshots');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

describe('Login E2E Test', function() {
  let driver;
  const baseUrl = process.env.BASE_URL || 'http://localhost:5173/#/login';

  before(async function() {
    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1920,1080');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      const image = await driver.takeScreenshot();
      fs.writeFileSync(path.join(SCREENSHOT_DIR, `fail_${this.currentTest.title.replace(/\s+/g, '_')}.png`), image, 'base64');
    } else if (this.currentTest.state === 'passed') {
      const image = await driver.takeScreenshot();
      fs.writeFileSync(path.join(SCREENSHOT_DIR, `pass_${this.currentTest.title.replace(/\s+/g, '_')}.png`), image, 'base64');
    }
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('should login successfully with any credentials', async function() {
    await driver.get(baseUrl);

    let emailInput = await driver.wait(until.elementLocated(By.id('email')), 5000);
    let passwordInput = await driver.wait(until.elementLocated(By.id('password')), 5000);
    let loginButton = await driver.wait(until.elementLocated(By.id('login-button')), 5000);

    await emailInput.sendKeys('test@example.com');
    await passwordInput.sendKeys('password123');
    await loginButton.click();

    await driver.wait(until.urlContains('#/dashboard'), 5000);
    
    let currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('#/dashboard'), 'Did not redirect to dashboard');
  });
});
