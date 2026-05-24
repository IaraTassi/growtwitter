/// <reference types="cypress" />

Cypress.Commands.add("loginByApi", (email: string, password: string) => {
  cy.request({
    method: "POST",
    url: "https://growtwitter-api-r4bi.onrender.com/api/users/login",
    body: {
      identifier: email,
      password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem("token", body.token);
    window.localStorage.setItem("user", JSON.stringify(body.user));
  });
});

Cypress.Commands.add("createTweetByApi", (content: string) => {
  const token = window.localStorage.getItem("token");

  return cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL")}/tweets`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      content,
    },
  });
});
