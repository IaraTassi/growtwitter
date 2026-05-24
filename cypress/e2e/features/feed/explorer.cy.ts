import { TEST_USERS } from "../../../fixtures/test-users";

describe("Explorer", () => {
  beforeEach(() => {
    cy.loginByApi(TEST_USERS.user1.email, TEST_USERS.user1.password);

    cy.visit("/app/explorer");
  });

  it("should render explorer timeline", () => {
    cy.get('[data-cy="explorer-timeline"]').should("be.visible");
  });

  it("should render suggested users list", () => {
    cy.get('[data-cy="suggestion-card"]')
      .should("exist")
      .and("have.length.at.least", 1);

    cy.get('[data-cy="follow-button"]').should("exist");
  });

  it("should follow user from explorer list", () => {
    cy.get('[data-cy="suggestion-card"]').first().as("firstSuggestion");

    cy.get("@firstSuggestion")
      .find('[data-cy="user-username"]')
      .invoke("text")
      .as("username");

    cy.get("@firstSuggestion").find('[data-cy="follow-button"]').click();

    cy.get("@username").then((username) => {
      const text = String(username).trim();

      cy.contains(text).should("not.exist");
    });
  });

  it("should load more suggested users", () => {
    cy.get('[data-cy="show-more-users"]').click();

    cy.get('[data-cy="suggestion-card"]').should("have.length.greaterThan", 3);
  });
});
