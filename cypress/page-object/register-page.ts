import { commonElements } from "./components/common-elements";

type InputName =
    | "username"
    | "email"
    | "password"

class RegisterPage {

    elements = {
        usernameInput: () => cy.getByTestId("username-input"),
        emailInput: () => cy.getByTestId("email-input"),
        passwordInput: () => cy.getByTestId("password-input"),
        signUpButton: () => cy.getByTestId("signup-btn"),
        validationMessage: (inputName: InputName) => cy.getByTestId(`${inputName}-validation-msg`),
        errorMessage: () => commonElements.errorMessage(),
    }

    visit() {
        cy.step('Visit "Register" page');
        cy.visit('/register');
    }

    typeUsername(username: string) {
        cy.step(`Type username - ${username}`);
        this.elements.usernameInput().type(username);
    }

    typeEmail(email: string) {
        cy.step(`Type email - ${email}`);
        this.elements.emailInput().type(email);
    }

    typePassword(password: string) {
        cy.step(`Type password - ${password}`);
        this.elements.passwordInput().type(password);
    }

    clickSignUp() {
        cy.intercept("POST", `${Cypress.env("API_URL")}/users`).as("signup");

        cy.step('Click "Sign Up" button');
        this.elements.signUpButton().click();
        cy.wait("@signup");
    }

    clearInput(inputName: InputName) {
        cy.step(`Clear "${inputName}" input`);

        switch (inputName) {
            case "username":
                this.elements.usernameInput().clear();
                break;

            case "email":
                this.elements.emailInput().clear();
                break;

            case "password":
                this.elements.passwordInput().clear();
                break;
        }
    }

    blurInput(inputName: InputName) {
        cy.step(`Blur "${inputName}" input`);

        switch (inputName) {
            case "username":
                this.elements.usernameInput().blur();
                break;

            case "email":
                this.elements.emailInput().blur();
                break;

            case "password":
                this.elements.passwordInput().blur();
                break;
        }
    }
}
export default RegisterPage;