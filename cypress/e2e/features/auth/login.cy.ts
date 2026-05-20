import { TEST_USERS } from "../../../fixtures/test-users";

describe("LoginPage", () => {
  describe("Login", () => {
    it("should login with email", () => {
      cy.visit("/login");

      cy.get('input[name="identifier"]').type(TEST_USERS.user1.email);

      cy.get('input[name="password"]').type(TEST_USERS.user1.password);

      cy.get("button[type=submit]").click();

      cy.url().should("not.include", "/login");

      cy.contains(TEST_USERS.user1.name).should("exist");
    });

    it("should login with username", () => {
      cy.visit("/login");

      cy.get('[data-cy="switch-login-mode"]').click();

      cy.contains("Nome de usuário").should("exist");

      cy.get('input[name="identifier"]').type(TEST_USERS.user1.userName);

      cy.get('input[name="password"]').type(TEST_USERS.user1.password);

      cy.get("button[type=submit]").click();

      cy.url().should("not.include", "/login");

      cy.contains(TEST_USERS.user1.name).should("exist");
    });

    it("should show error for non-existent user", () => {
      cy.visit("/login");

      cy.get('input[name="identifier"]').type("cacau.cats@test.com");

      cy.get('input[name="password"]').type(TEST_USERS.user1.password);

      cy.get("button[type=submit]").click();

      cy.contains("Usuário não encontrado.").should("exist");
    });

    it("should show error for incorrect password", () => {
      cy.visit("/login");

      cy.get('input[name="identifier"]').type(TEST_USERS.user1.email);

      cy.get('input[name="password"]').type("112211");

      cy.get("button[type=submit]").click();

      cy.contains("Senha incorreta.").should("exist");
    });
  });

  describe("Register", () => {
    it("should register successfully with imageUrl", () => {
      const timestamp = Date.now();

      cy.visit("/login");

      cy.contains("Inscreva-se").click();

      cy.get('input[name="name"]').type("Novo User");

      cy.get('input[name="userName"]').type(`user_${timestamp}`);

      cy.get('input[name="email"]').type(`user_${timestamp}@mail.com`);

      cy.get('input[name="password"]').type("123456");

      cy.get('input[name="imageUrl"]').type(
        "https://api.dicebear.com/7.x/avataaars/svg?seed=e2e",
      );

      cy.get("button[type=submit]").click();

      cy.contains("Conta criada com sucesso").should("exist");
    });

    it("should register successfully without imageUrl", () => {
      const timestamp = Date.now();

      cy.visit("/login");

      cy.contains("Inscreva-se").click();

      cy.get('input[name="name"]').type("Novo User");

      cy.get('input[name="userName"]').type(`user_${timestamp}`);

      cy.get('input[name="email"]').type(`user_${timestamp}@mail.com`);

      cy.get('input[name="password"]').type("123456");

      cy.get("button[type=submit]").click();

      cy.contains("Conta criada com sucesso").should("exist");
    });

    it("should show error for duplicate email", () => {
      const uniqueId = Date.now().toString().slice(-6);

      cy.visit("/login");

      cy.contains("Inscreva-se").click();

      cy.get('input[name="name"]').type("Teste Duplicado");

      cy.get('input[name="userName"]').type(`dup_user_${uniqueId}`);

      cy.get('input[name="email"]').type(TEST_USERS.user1.email);

      cy.get('input[name="password"]').type("123456");

      cy.get("button[type=submit]").click();

      cy.contains("O email já está em uso.", {
        timeout: 10000,
      }).should("exist");
    });

    it("should show error for duplicate username", () => {
      const uniqueId = Date.now().toString().slice(-6);

      cy.visit("/login");

      cy.contains("Inscreva-se").click();

      cy.get('input[name="name"]').type("Teste Duplicado");

      cy.get('input[name="userName"]').type(TEST_USERS.user2.userName);

      cy.get('input[name="email"]').type(`dup_email_${uniqueId}@example.com`);

      cy.get('input[name="password"]').type(TEST_USERS.user2.password);

      cy.get("button[type=submit]").click();

      cy.contains("O nome de usuário já está em uso.", {
        timeout: 10000,
      }).should("exist");
    });

    it("should show validation errors", () => {
      cy.visit("/login");

      cy.contains("Inscreva-se").click();

      cy.get("button[type=submit]").click();

      cy.contains("O nome completo é obrigatório.").should("exist");

      cy.contains("O nome de usuário é obrigatório.").should("exist");

      cy.contains("O email é obrigatório.").should("exist");

      cy.contains("A senha é obrigatória.").should("exist");
    });
  });

  describe("Mode switch", () => {
    it("should switch to register mode", () => {
      cy.visit("/login");

      cy.contains("Inscreva-se").click();

      cy.contains("Criar conta").should("exist");
    });
  });
});
