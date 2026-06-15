const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Login E2E Test', function() {
  let driver;

  before(async function() {
    // We are running against the local Vite dev server or a built version
    // Assume Vite dev server is running on localhost:5173 or HashRouter
    // We can also test against the local build or live site.
    // For CI, it often points to a running local server.
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('should login successfully with any credentials', async function() {
    // Go to login page. We use HashRouter, so we navigate to #/login
    await driver.get('http://localhost:5173/#/login');

    // Wait until the email input is loaded
    let emailInput = await driver.wait(until.elementLocated(By.id('email')), 5000);
    let passwordInput = await driver.wait(until.elementLocated(By.id('password')), 5000);
    let loginButton = await driver.wait(until.elementLocated(By.id('login-button')), 5000);

    // Enter credentials
    await emailInput.sendKeys('test@example.com');
    await passwordInput.sendKeys('password123');

    // Click login
    await loginButton.click();

    // Validate dashboard redirect
    // The URL should change to #/dashboard
    await driver.wait(until.urlContains('#/dashboard'), 5000);
    
    let currentUrl = await driver.getCurrentUrl();
    assert(currentUrl.includes('#/dashboard'), 'Did not redirect to dashboard');
  });
});
