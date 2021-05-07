const chai = require("chai");
var expect = chai.expect;
const { takeScreenshot } = require("../common/take_screenshot");
const {
  Given,
  Then,
  When,
  BeforeAll,
  After,
  Before,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { browser, element } = require("protractor");

Given("I am on the page to add a new owner", async function () {
  await browser.get(`/petclinic/owners/add`);
  await takeScreenshot(this, browser, "pet_clinic_screen");
});

When("I click on the back button", async function () {
  const backButton = await element(by.cssContainingText(".btn", "Back"));
  await backButton.click();
});
Then(
  "I expect to go back to the page with a table of owners info",
  async function () {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).to.equal(`${browser.baseUrl}petclinic/owners`);
    await takeScreenshot(this, browser, "table_of_owners");
  }
);
Given("I am on the add owner page", async function () {
  await browser.get(`/petclinic/owners/add`);
  await takeScreenshot(this, browser, "pet_clinic_add_owner_screen");
});

Given("The input for Telephone is not a series of numbers", async function () {
  const telephone = element(by.id("telephone"));
  telephone.sendKeys("asdf");
  expect(telephone).not.to.be.undefined;
  await takeScreenshot(this, browser, "non_numeric_telephone");
});

When("I try to click on Add Owner", async function () {
  const addOwnerButton = element(by.cssContainingText(".btn", "Add Owner"));
  await addOwnerButton.click();
});

Then("I expect the Add Owner button to not be clickable", async function () {
  expect(
    await element(by.cssContainingText(".btn", "Add Owner")).getAttribute(
      "disabled"
    )
  ).equals("true");
  await takeScreenshot(this, browser, "disabled_button");
});

setDefaultTimeout(100000);
// BeforeAll(async () => browser.waitForAngular(true));
BeforeAll(async () => {
  return new Promise((resolve) => setTimeout(resolve, 4000));
});
After(async () => {
  return new Promise((resolve) => setTimeout(resolve, 4000));
});
Before(async () => browser.get("/"));
Before(async () => browser.waitForAngularEnabled(false));

Given("I am on the Add New Veterinarian page", async function () {
  await browser.get(`/petclinic/vets/add`);
  await takeScreenshot(this, browser, "pet_page");
});

When("I type in {word} for First Name", async function (word) {
  const name = element(by.id("firstName"));
  await name.sendKeys(word);
  expect(name).not.to.be.undefined;
  await takeScreenshot(this, browser);
});

When("I type in {word} for Last Name", async function (word) {
  const name = element(by.id("lastName"));
  await name.sendKeys(word);
  expect(name).not.to.be.undefined;
  await takeScreenshot(this, browser);
});

When("I select {word} from the Type dropdown", async function (word) {
  await element(by.cssContainingText("option", word)).click();
  await takeScreenshot(this, browser);
});

Then("I should be able to click Save Vet", async function () {
  expect(element(by.cssContainingText(".btn", "Save Vet")).click());
  const currentUrl = await browser.getCurrentUrl();
  expect(currentUrl).to.equal(`${browser.baseUrl}petclinic/vets`);
  await takeScreenshot(this, browser);
});

Then(
  "I should see {string} added to the list of veterinarians",
  async function (string) {
    expect(element(by.cssContainingText(".td", string)).isPresent()).not.to.be
      .undefined;
    await takeScreenshot(this, browser);
  }
);
