import { TEST_USERS } from "../../../fixtures/test-users";

describe("Profile", () => {
  beforeEach(() => {
    cy.loginByApi(TEST_USERS.user1.email, TEST_USERS.user1.password);
  });

  it("should render logged user profile", () => {
    cy.visit(`/app/profile/${TEST_USERS.user1.id}`);

    cy.get('[data-cy="profile-timeline"]').should("be.visible");
  });

  it("should navigate to visited user profile", () => {
    cy.visit("/app");

    cy.get('[data-cy="feed-card"]')
      .first()
      .find('[data-cy="profile-link"]')
      .eq(0)
      .click();

    cy.url().should("include", "/app/profile/");

    cy.get('[data-cy="profile-timeline"]').should("be.visible");
  });

  it("should render follow button for visited profile", () => {
    cy.visit(`/app/profile/${TEST_USERS.user2.id}`);

    cy.get('[data-cy="profile-timeline"]').should("be.visible");

    cy.get('[data-cy="follow-button"]').should("exist");
  });

  it("should not render follow button for own profile", () => {
    cy.visit(`/app/profile/${TEST_USERS.user1.id}`);

    cy.get('[data-cy="follow-button"]').should("not.exist");
  });

  it("should switch profile tabs", () => {
    cy.visit(`/app/profile/${TEST_USERS.user1.id}`);

    cy.get('[data-cy="tab-tweets"]').first().click();
    cy.get('[data-cy="tab-replies"]').first().click();
    cy.get('[data-cy="tab-media"]').first().click();
    cy.get('[data-cy="tab-likes"]').first().click();

    cy.get('[data-cy="profile-timeline"]').should("be.visible");
  });
});
