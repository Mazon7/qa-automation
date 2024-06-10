/// <reference types="cypress" />

import loginPage from "../selectors/loginSelectors";
import resetPassPage from "../selectors/loginSelectors";

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("https://auth.abtasty.com/login");

    // Check that all elements on Login page exist and visible
    cy.loginElsCheck();
  });

  it("Check email input placeholder", () => {
    cy.get(loginPage.emailInput).should(
      "have.attr",
      "placeholder",
      "name@abtasty.com"
    );
  });

  it("Check the valid email", () => {
    cy.get(loginPage.emailInput).type("a@b.c");
    cy.get(loginPage.emailInput).should("have.value", "a@b.c");
    cy.get(loginPage.emailLabel).click();
    cy.get(loginPage.emailErrorMesage).should("not.exist");
  });

  it("Check the invalid email", () => {
    const invalidEmails = ["a@.c", "@c.c", "a@c", "ab.com"];
    invalidEmails.forEach((item) => {
      cy.get(loginPage.emailInput).clear();
      cy.get(loginPage.emailInput).type(item);
      cy.get(loginPage.emailInput).should("have.value", item);
      cy.get(loginPage.emailLabel).click();
      cy.get(loginPage.emailErrorMesage)
        .should("be.visible")
        .and("have.text", "Please enter a valid email");
    });
  });

  it("Check password input placeholder", () => {
    cy.get(loginPage.passwordInput).should(
      "have.attr",
      "placeholder",
      "At least 12 characters"
    );
  });

  it("Show/hide password", () => {
    cy.get(loginPage.emailInput).type("randompassword");
    cy.get(loginPage.showPasswordIcon).click();
    cy.get(loginPage.emailLabel)
      .should("have.prop", "nodeName", "INPUT")
      .and("have.attr", "type", "password");
  });

  it("Succecfull Login with valid credentials", () => {
    cy.login("", ""); // Input correct email
    cy.url().should("not.eq", "https://auth.abtasty.com/login");
    // TODO: add correct url assertion (MFA page or else if different scenario)
  });

  // Repeat this test for wrong email
  it("Unsuccecfull Login with invalid credentials", () => {
    cy.login("blabla@abtasty.com", "wrongpassword");
    cy.get(loginPage.credentialsErrorMsg)
      .should("be.visible")
      .and("have.text", "Please enter a valid email or password");
  });

  it("Check reset password functionality", () => {
    cy.get(loginPage.forgotPasswordLink).click();
    cy.url().should("eq", "https://auth.abtasty.com/reset-password");

    cy.get(resetPassPage.emailInput)
      .should("be.visible")
      .and("have.attr", "placeholder", "name@abtasty.com");

    cy.get(resetPassPage.emailInput).type("test@abtasty.com");

    cy.get(resetPassPage.sendPasswordLinkBtn).click();

    cy.get(resetPassPage.resetPassSuccessMsg)
      .should("be.visible")
      .and(
        "contain",
        "We've sent an email to t***@a******.com  with password reset instructions."
      );

    cy.get("p").should(
      "have.text",
      "You should receive an email from support@abtasty.com. If it is not the case, please check your spam folder.The link in the email will expire in 8 hours."
    );

    cy.get(resetPassPage.crossIconLink).should("be.visible").click();

    cy.url().should("eq", "https://auth.abtasty.com/login");
  });

  it("Check Captcha after 3 unsuccessful login attempts", () => {
    for (let step = 0; step < 3; step++) {
      cy.login("blabla@abtasty.com", "randompassword");
    }
    // TODO: Check that Captcha is shown
  });

  it("Check redirect to SSO page", () => {
    cy.login("sso_user@abtasty.com", "randompass"); // Input SSO user email
    cy.wait(2000);
    cy.url().should("eq", "https://auth.abtasty.com/ssologin");
  });

  it("Sing In with SSO as a non SSO user", () => {
    cy.login("sso_user@abtasty.com", "randompass"); // Input SSO user email
    cy.wait(2000);
    cy.url().should("eq", "https://auth.abtasty.com/ssologin");
  });

  // To complete other test in a good fashion, additional data is required
  // And etc...
});
