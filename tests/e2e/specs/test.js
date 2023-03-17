// TODO: Add your E2E tests here.

describe("inputNumberComponent", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080"); // Replace with the URL of your app
  });

  it("allows the user to enter a valid number", () => {
    const inputSelector = ".inputNumberComponent__container--input";

    cy.get(inputSelector).as("amount");

    cy.get(inputSelector).type("1000").should("have.value", "1000");
    cy.get("@amount").invoke("val").then(parseFloat).should("equal", 1000);

    cy.get(inputSelector)
      .clear()
      .type("20000000")
      .should("have.value", "20000000");
    cy.get("@amount").invoke("val").then(parseFloat).should("equal", 20000000);
  });

  it("displays an error message for an invalid number", () => {
    const inputSelector = ".inputNumberComponent__container--input";
    cy.get(inputSelector).as("amount");
    const errorMessageSelector = ".inputNumberComponent--error";

    cy.get(inputSelector).type("999").blur();
    cy.get(errorMessageSelector)
      .should("be.visible")
      .and(
        "contain",
        "Please enter a numeric value between 1,000 and 20,000,000."
      );
    // cy.get("@amount").invoke("val").then(parseFloat).should("999");

    cy.get(inputSelector).clear().type("20000001").blur();
    cy.get(errorMessageSelector)
      .should("be.visible")
      .and(
        "contain",
        "Please enter a numeric value between 1,000 and 20,000,000."
      );
    // cy.get("@amount").invoke("val").then(parseFloat).should("20000001");
  });
});

describe("Loan Calculator App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays loan amount and loan purpose options", () => {
    cy.get(".inputNumberComponent__container--input").should(
      "have.attr",
      "placeholder",
      "1,000"
    );
    cy.get("#loanPurposes")
      .should("contain", "Select Loan Purposes")
      .and("not.be.disabled");
  });

  it("displays repayment period and term months options", () => {
    cy.get("#requestedRepaymentPeriods")
      .should("contain", "Select Repayment Periods")
      .and("not.be.disabled");
    cy.get("#requestedTermMonths")
      .should("contain", "Select Term Months")
      .and("not.be.disabled");
  });

  it("displays calculated single and total repayment amounts", () => {
    cy.get(".inputNumberComponent__container--input").type("30000");
    cy.get("#loanPurposes").select("Day-to-day capital");
    cy.get("#requestedRepaymentPeriods").select("Monthly");
    cy.get("#requestedTermMonths").select("2 years");
    cy.get(".footer")
      .should("contain", "$1,384.35 Monthly repayments")
      .and("contain", "$33,224.4 Total repayment");
  });
});
