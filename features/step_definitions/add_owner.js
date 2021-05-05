const chai = require("chai");
var expect = chai.expect;
var eventually = chai.eventually;
// var chaiAsPromised = require('chai-as-promised');
// import { Given } from "@cucumber/cucumber";
const {
  Given,
  Then,
  When,
  BeforeAll,
  AfterStep,
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
    // const currentUrl = await browser.getCurrentUrl();
    // expect(currentUrl).to.equal(`${browser.baseUrl}petclinic/owners`);
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
});

setDefaultTimeout(100000);
Given("I am on the Add New Veterinarian page", async function () {
  // Write code here that turns the phrase above into concrete actions
  try {
    await browser.get(`/petclinic/vets/add`, 100000);
  } catch (e) {
    await browser.get("/", 100000);
  }
});
BeforeAll(async () => {
  return new Promise((resolve) => setTimeout(resolve, 4000));
});
After(async () => {
  return new Promise((resolve) => setTimeout(resolve, 4000));
});

When("I type in {word} for First Name", async function (word) {
  // const name = element(by.id("firstName"));
  // name.sendKeys(word);
  // expect(name).not.to.be.undefined;
});

// When("I type in {word} for Last Name", async function (word) {
//   await browser.waitForAngularEnabled(true);
//   const name = element(by.id("lastName"));
//   name.sendKeys(word);
//   expect(name).not.to.be.undefined;
// });

// When("I select {word} from the Type dropdown", async function (word) {
//   await browser.waitForAngularEnabled(true);
//   element(by.cssContainingText("option", word)).click();
// });

// Then("I should be able to click Save Vet", async function () {
//   await browser.waitForAngularEnabled(true);
//   expect(element(by.cssContainingText(".btn", "Save Vet")).click());
// });

// Then(
//   "I should see {string} added to the list of veterinarians",
//   async function (string) {
//     await browser.waitForAngularEnabled(true);
//     expect(element(by.cssContainingText(".td", string)).isPresent()).not.to.be
//       .undefined;
//   }
// );
