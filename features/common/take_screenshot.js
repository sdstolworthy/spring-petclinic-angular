const { World } = require("@cucumber/cucumber");
const fs = require("fs");
const { ProtractorBrowser } = require("protractor");
function ensureDirectoryExists(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}
/**
 * @param {World} world
 * @param {ProtractorBrowser} browser
 * @param {string} filename
 * @returns {Promise<string>}
 */
async function takeScreenshot(world, browser, filename) {
  const screenshot = await browser.driver.takeScreenshot();
  const dir = ".tmp/screenshots/";
  ensureDirectoryExists(dir);
  fs.writeFileSync(`${dir}${filename}.png`, screenshot, "base64");
  world.attach(
    Buffer.alloc(screenshot.length, screenshot, "base64"),
    "image/png"
  );
  return screenshot;
}

module.exports = { takeScreenshot };
