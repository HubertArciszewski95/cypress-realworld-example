import { commonElements } from "./components/common-elements";

type InputName =
    | "email"
    | "password"

class LoginPage {

    elements = {
        emailInput: () => cy.getByTestId("email-input"),
        passwordInput: () => cy.getByTestId("password-input"),
        signInButton: () => cy.getByTestId("signin-btn"),
        validationMessage: (inputName: InputName) => cy.getByTestId(`${inputName}-validation-msg`),
        errorMessage: () => commonElements.errorMessage(),
    }

    visit() {
        cy.step('Visit "Login" page');
        cy.visit('/login');
    }

    typeEmail(email: string) {
        cy.step(`Type email - ${email}`);
        this.elements.emailInput().type(email);
    }

    typePassword(password: string) {
        cy.step(`Type password - ${password}`);
        this.elements.passwordInput().type(password);
    }

    clickSignIn() {
        cy.intercept("POST", `${Cypress.env("API_URL")}/users/login`).as("signup");

        cy.step('Click "Sign In" button');
        this.elements.signInButton().click();
        cy.wait("@signup");
    }

    clearInput(inputName: InputName) {
        cy.step(`Clear "${inputName} input"`);
        
        switch (inputName) {
            case "email":
                this.elements.emailInput().clear();
                break;
                
            case "password":
                this.elements.passwordInput().clear();
                break;
        }
    }

    blurInput(inputName: InputName) {
        cy.step(`Blur "${inputName} input"`);

        switch (inputName) {
            case "email":
                this.elements.emailInput().blur();
                break;
                
            case "password":
                this.elements.passwordInput().blur();
                break;
        }
    }
}

export default LoginPage;
