/// <reference types="cypress" />

Cypress.Commands.add("loginByApi", (identifier: string, password: string) => {
  cy.request({
    method: "POST",
    url: "https://growtwitter-api-r4bi.onrender.com/api/users/login",
    body: {
      identifier,
      password,
    },
  }).then((response) => {
    const { token, user } = response.body;

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("user", JSON.stringify(user));
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
