const fs = require("fs");
function ensureDirectoryExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}
async function takeScreenshot(browser, filename) {
  const screenshot = await browser.driver.takeScreenshot();
  const dir = ".tmp/screenshots/";
  ensureDirectoryExists(dir);
  fs.writeFileSync(`${dir}${filename}.png`, screenshot, "base64");
}

module.exports = { takeScreenshot };
