// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import loginPage from "../selectors/loginSelectors";
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginElsCheck", () => {
  cy.get(loginPage.emailLabel).should("be.visible");
  cy.get(loginPage.emailInput).should("be.visible");
  cy.get(loginPage.passwordLabel).should("be.visible");
  cy.get(loginPage.passwordInput).should("be.visible");
  cy.get(loginPage.showPasswordIcon).should("be.visible");
  cy.get(loginPage.forgotPasswordLink).should("be.visible");
  cy.get(loginPage.signInButton).should("be.visible").and("be.disabled");
  cy.get(loginPage.signInWithSSO).should("be.visible").and("be.enabled");
});

Cypress.Commands.add("login", (email, password) => {
  cy.get(loginPage.emailInput).type(email);
  cy.get(loginPage.passwordInput).type(password);
  cy.get(loginPage.signInButton).should("be.enabled");
  cy.get(loginPage.signInButton).submit();
});
