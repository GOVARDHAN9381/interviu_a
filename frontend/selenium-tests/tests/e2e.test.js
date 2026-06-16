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

describe('Web Application E2E Test Suite', function() {
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

  it('should render the Dashboard correctly', async function() {
    // Check for Welcome back text
    let welcomeHeader = await driver.wait(until.elementLocated(By.xpath("//h1[contains(text(), 'Welcome back!')]")), 5000);
    let isDisplayed = await welcomeHeader.isDisplayed();
    assert(isDisplayed, 'Dashboard welcome header is not displayed');

    // Check for Start New Interview button
    let startBtn = await driver.findElement(By.xpath("//a[contains(., 'Start New Interview')]"));
    assert(await startBtn.isDisplayed(), 'Start New Interview button is missing');
  });

  it('should navigate through sidebar links successfully', async function() {
    // Helper to click link and wait for URL
    const navigateAndVerify = async (linkText, expectedHash) => {
      let link = await driver.wait(until.elementLocated(By.xpath(`//a[contains(., '${linkText}')]`)), 5000);
      await link.click();
      await driver.wait(until.urlContains(expectedHash), 5000);
      let url = await driver.getCurrentUrl();
      assert(url.includes(expectedHash), `Failed to navigate to ${linkText}. Expected URL to contain ${expectedHash}`);
    };

    await navigateAndVerify('Interviews', '#/interviews');
    await navigateAndVerify('Courses', '#/courses');
    await navigateAndVerify('History', '#/history');
    await navigateAndVerify('Resume Analysis', '#/resume');
  });

  it('should logout successfully', async function() {
    // Click Logout button
    let logoutBtn = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Logout')]")), 5000);
    await logoutBtn.click();

    // Verify redirection to login or root
    await driver.wait(until.urlContains('#/'), 5000);
    
    // We expect the email field to be present again on the login screen
    let emailInput = await driver.wait(until.elementLocated(By.id('email')), 5000);
    assert(await emailInput.isDisplayed(), 'Failed to redirect to login page after logout');
  });
});
