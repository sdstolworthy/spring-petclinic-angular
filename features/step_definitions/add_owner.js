const chai = require("chai");
var expect = chai.expect;
// var chaiAsPromised = require('chai-as-promised');
// import { Given } from "@cucumber/cucumber";
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
  // Write code here that turns the phrase above into concrete actions
  // http://localhost:4200/petclinic/owners
  // http://localhost:4200/petclinic/owners/add
  await browser.waitForAngularEnabled(true);
  await browser.get(`/petclinic/owners/add`);
  await takeScreenshot(this, browser, "pet_clinic_screen");
});

When("I click on the back button", async function () {
  // Write code here that turns the phrase above into concrete actions
  await browser.waitForAngularEnabled(true);
  const backButton = await element(by.cssContainingText(".btn", "Back"));
  await backButton.click();
});
Then(
  "I expect to go back to the page with a table of owners info",
  async function () {
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).to.equal(`${browser.baseUrl}petclinic/owners`);
  }
);
Given("I am on the add owner page", async function () {
  await browser.get(`/petclinic/owners/add`);
});

Given("The input for Telephone is not a series of numbers", async function () {
  // Write code here that turns the phrase above into concrete actions
  await browser.waitForAngularEnabled(true);
  const telephone = element(by.id("telephone"));
  telephone.sendKeys("asdf");
  expect(telephone).not.to.be.undefined;
  takeScreenshot(this, browser, "telephone not numbers");
});

When("I try to click on Add Owner", async function () {
  await browser.waitForAngularEnabled(true);
  const addOwnerButton = element(by.cssContainingText(".btn", "Add Owner"));
  await addOwnerButton.click();
});

Then("I expect the Add Owner button to not be clickable", async function () {
  await browser.waitForAngularEnabled(true);
  expect(
    await element(by.cssContainingText(".btn", "Add Owner")).getAttribute(
      "disabled"
    )
  ).equals("true");
  takeScreenshot(this, browser, "add_owner_disabled");
});

setDefaultTimeout(100000);
BeforeAll(async () => {
  return new Promise((resolve) => setTimeout(resolve, 4000));
});
After(async () => {
  return new Promise((resolve) => setTimeout(resolve, 4000));
});
// Before(() => browser.waitForAngularEnabled(true));
Before(async () => browser.get("/"));

Given("I am on the Add New Veterinarian page", async function () {
  await browser.get(`/petclinic/vets/add`);
  takeScreenshot(this, browser, "add_new_vet");
});
When("I type in Wuxin for First Name", async function () {
  takeScreenshot(this, browser, "first_name");
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const name = await element(by.xpath('//*[@id="firstName"]'));
  name.sendKeys("Wuxin");
  expect(name).not.to.be.undefined;
  takeScreenshot(this, browser, "first_name_after");
});

When("I type in Zeng for Last Name", async function () {
  const name = element(by.id("lastName"));
  await name.sendKeys("Zeng");
  expect(name).not.to.be.undefined;
  takeScreenshot(this, browser, "last_name");
});

When("I select radiology from the Type dropdown", async function () {
  element(by.cssContainingText("option", "radiology")).click();
  takeScreenshot(this, browser, "specialty");
});

Then("I should be able to click Save Vet", async function () {
  expect(element(by.cssContainingText(".btn", "Save Vet")).click());
  takeScreenshot(this, browser, "save_vet");
});

Then(
  "I should see Wuxin Zeng added to the list of veterinarians",
  async function () {
    await browser.waitForAngularEnabled(true);
    expect(element(by.cssContainingText(".td", "Wuxin Zeng")).isPresent()).not
      .to.be.undefined;
    takeScreenshot(this, browser, "see_name_in_table");
  }
);
