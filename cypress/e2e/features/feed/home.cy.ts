import { TEST_USERS } from "../../../fixtures/test-users";

describe("Home", () => {
  beforeEach(() => {
    cy.loginByApi(TEST_USERS.user1.email, TEST_USERS.user1.password);
    cy.visit("/app");
  });

  describe("Sidebar", () => {
    it("should render sidebar", () => {
      cy.contains("Página Inicial").should("exist");
      cy.contains("Explorar").should("exist");
      cy.contains("Perfil").should("exist");
    });

    it("should navigate through sidebar", () => {
      cy.loginByApi(TEST_USERS.user1.email, TEST_USERS.user1.password);

      cy.visit("/app");

      cy.get("aside").should("be.visible");

      cy.get('[data-cy="nav-home"]', { timeout: 10000 })
        .should("be.visible")
        .click();

      cy.url().should("include", "/app");

      cy.get('[data-cy="nav-explorer"]').should("be.visible").click();

      cy.url().should("include", "/app/explorer");

      cy.get('[data-cy="nav-profile"]').should("be.visible").click();

      cy.url().should("include", "/app/profile/");
    });

    it("should logout successfully", () => {
      cy.loginByApi(TEST_USERS.user1.email, TEST_USERS.user1.password);

      cy.visit("/app");

      cy.get('[data-cy="nav-home"]').should("be.visible");

      cy.contains("Sair").should("be.visible");

      cy.get('[data-cy="logout"]').click();

      cy.get('[data-cy="confirm-dialog"]', { timeout: 10000 })
        .should("be.visible")
        .and("contain", "Sair da conta?");

      cy.get('[data-cy="dialog-confirm"]').click();

      cy.url().should("include", "/login");
    });
  });

  describe("Feed", () => {});
});
