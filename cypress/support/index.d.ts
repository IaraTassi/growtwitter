declare namespace Cypress {
  interface Chainable {
    loginByApi(email: string, password: string): Chainable<void>;

    createTweetByApi(content: string): Chainable<Response<unknown>>;
  }
}
