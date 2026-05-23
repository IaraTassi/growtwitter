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

    it("should logout without showing session expired dialog", () => {
      cy.loginByApi(TEST_USERS.user1.email, TEST_USERS.user1.password);

      cy.visit("/app");

      cy.get('[data-cy="logout"]').click();

      cy.get('[data-cy="confirm-dialog"]', { timeout: 10000 })
        .should("be.visible")
        .and("contain", "Sair da conta?");

      cy.get('[data-cy="dialog-confirm"]').click();

      cy.url().should("include", "/login");

      cy.url().should("not.include", "expired=true");

      cy.get('[data-cy="confirm-dialog"]').should("not.exist");
    });

    it("should create tweet from sidebar composer", () => {
      const tweet = `tweet e2e ${Date.now()}`;

      cy.get('[data-cy="nav-tweet"]').click();

      cy.get('[data-cy="composer-input"]').should("be.visible").type(tweet);

      cy.get('[data-cy="composer-submit"]').click();

      cy.contains(tweet).should("be.visible");
    });
  });

  describe("RightBar", () => {
    it("should persist theme after reload", () => {
      cy.loginByApi(TEST_USERS.user1.email, TEST_USERS.user1.password);

      cy.visit("/app");

      cy.get('[data-cy="theme-toggle"]:visible')
        .should("have.length", 1)
        .click();

      cy.reload();

      cy.window().then((win) => {
        expect(win.localStorage.getItem("theme-mode")).to.eq("light");
      });
    });

    it("should redirect to explorer page", () => {
      cy.loginByApi(TEST_USERS.user1.email, TEST_USERS.user1.password);

      cy.visit("/app");

      cy.get('[data-cy="show-more"]').click();

      cy.url().should("include", "/app/explorer");
    });
  });

  describe("Feed", () => {
    it("should render home timeline", () => {
      cy.visit("/app");

      cy.get('[data-cy="home-timeline"]').should("be.visible");
    });

    it("should switch between feed tabs", () => {
      cy.visit("/app");

      cy.get('[data-cy="feed-tab-foryou"]').click();

      cy.get('[data-cy="feed-tab-foryou"]').should(
        "have.attr",
        "aria-selected",
        "true",
      );

      cy.get('[data-cy="feed-tab-following"]').click();

      cy.get('[data-cy="feed-tab-following"]').should(
        "have.attr",
        "aria-selected",
        "true",
      );
    });

    it("should create a reply from feed timeline", () => {
      const parentTweet = `parent ${Date.now()}`;
      const reply = `reply ${Date.now()}`;

      cy.createTweetByApi(parentTweet);

      cy.visit("/app");

      cy.get('[data-cy="feed-tab-foryou"]').click();

      cy.contains(parentTweet, { timeout: 10000 })
        .should("be.visible")
        .parents('[data-cy="feed-card"]')
        .find('[data-cy="reply-button"]')
        .click();

      cy.get('[data-cy="composer-input"]').should("be.visible").type(reply);

      cy.get('[data-cy="composer-submit"]').click();

      cy.contains(reply).should("be.visible");
    });

    it("should toggle nested thread replies", () => {
      const parentTweet = `parent ${Date.now()}`;
      const replyLevel1 = `reply level 1 ${Date.now()}`;
      const replyLevel2 = `reply level 2 ${Date.now()}`;

      cy.createTweetByApi(parentTweet);

      cy.visit("/app");

      cy.get('[data-cy="feed-tab-foryou"]').click();

      cy.contains(parentTweet)
        .should("be.visible")
        .parents('[data-cy="feed-card"]')
        .find('[data-cy="reply-button"]')
        .click();

      cy.get('[data-cy="composer-input"]')
        .should("be.visible")
        .type(replyLevel1);

      cy.get('[data-cy="composer-submit"]').click();

      cy.contains(replyLevel1).should("be.visible");

      cy.contains(replyLevel1)
        .parents('[data-cy="feed-card"]')
        .find('[data-cy="reply-button"]')
        .click();

      cy.get('[data-cy="composer-input"]')
        .should("be.visible")
        .type(replyLevel2);

      cy.get('[data-cy="composer-submit"]').click();

      cy.reload();

      cy.get('[data-cy="feed-tab-foryou"]').click();

      cy.get('[data-cy="expand-replies"]').should("exist").first().click();

      cy.get('[data-cy="collapse-replies"]').should("exist").first().click();

      cy.get('[data-cy="expand-replies"]').should("exist");
    });
  });
});
