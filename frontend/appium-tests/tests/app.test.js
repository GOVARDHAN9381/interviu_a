import { remote } from 'webdriverio';
import fs from 'fs';
import path from 'path';

const RESULT_DIR = path.resolve('Test Results', 'Screenshots');
if (!fs.existsSync(RESULT_DIR)) {
  fs.mkdirSync(RESULT_DIR, { recursive: true });
}

describe('Android Appium E2E Test', function() {
  let driver;

  before(async function() {
    const caps = {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:app': process.env.APK_PATH || path.resolve('android/app/build/outputs/apk/debug/app-debug.apk'),
      'appium:ensureWebviewsHavePages': true,
      'appium:nativeWebScreenshot': true,
      'appium:newCommandTimeout': 3600,
      'appium:connectHardwareKeyboard': true
    };

    driver = await remote({
      protocol: 'http',
      hostname: '127.0.0.1',
      port: 4723,
      path: '/',
      capabilities: caps
    });
  });

  afterEach(async function() {
    if (this.currentTest.state === 'failed' || this.currentTest.state === 'passed') {
      const prefix = this.currentTest.state === 'failed' ? 'fail_' : 'pass_';
      const image = await driver.takeScreenshot();
      fs.writeFileSync(path.join(RESULT_DIR, `${prefix}${this.currentTest.title.replace(/\s+/g, '_')}.png`), image, 'base64');
    }
  });

  after(async function() {
    if (driver) {
      await driver.deleteSession();
    }
  });

  it('should launch the application successfully', async function() {
    // Basic verification that app launched
    const contexts = await driver.getContexts();
    console.log('Available Contexts:', contexts);
    
    // Switch to webview if it's a capacitor app
    const webview = contexts.find(c => c.includes('WEBVIEW'));
    if (webview) {
      await driver.switchContext(webview);
      console.log('Switched to WEBVIEW');
      
      // Try to find the login button
      const loginBtn = await driver.$('#login-button');
      const exists = await loginBtn.isExisting();
      console.log('Login button exists:', exists);
    }
  });
});
