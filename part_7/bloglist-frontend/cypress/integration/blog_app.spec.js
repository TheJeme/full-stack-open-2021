describe("Blog app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testi92");
      cy.get("#password").type("testi92");
      cy.get("#login-button").click();
      cy.contains("blogs");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("invalid");
      cy.get("#password").type("invalid");
      cy.get("#login-button").click();

      cy.contains("Username or password is wrong");
    });
  });

  describe("When logged in", function () {
    describe("blog exists", function () {
      beforeEach(function () {
        cy.get("#username").type("testi92");
        cy.get("#password").type("testi92");
        cy.get("#login-button").click();
        cy.contains("blogs");
        cy.contains("create new blog").click();
      });

      it("it can be liked", function () {
        cy.get("#title").type("title");
        cy.get("#author").type("author");
        cy.get("#url").type("url");
        cy.get("#create-new-blog").click();
        cy.contains("view").click();
        cy.contains("like").click();
        cy.contains("view").click();
        cy.contains("title");
        cy.contains("author");
        cy.contains("url");
        cy.contains("likes 1");
      });

      it("it can be removed", function () {
        cy.contains("view").click();
        cy.contains("remove").click();

        cy.on("window:confirm", () => true);

        cy.get("blog").should("not.exist");
      });
      it("the one with most likes is above", async function () {
        cy.get("#title").type("above");
        cy.get("#author").type("author");
        cy.get("#url").type("url");
        cy.get("#create-new-blog").click();

        cy.contains("create new blog").click();
        cy.get("#title").type("bottom");
        cy.get("#author").type("author");
        cy.get("#url").type("url");
        cy.get("#create-new-blog").click();
        cy.contains("view").click();
        cy.contains("like").click();

        cy.get(".blog:first").contains("likes 1");
      });
    });
  });
});
