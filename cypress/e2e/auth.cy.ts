import RegisterPage from "../page-object/register-page";
import LoginPage from "../page-object/login-page";
import Header from "../page-object/components/header";

import { faker } from '@faker-js/faker';
import user from "../fixtures/user.json";


describe('Authentication', () => {
    const registerPage = new RegisterPage();
    const loginPage = new LoginPage();
    const header = new Header();

    const wrongEmailFormat = [
        "plainaddress",      // Missing @ sign and domain
        "@domain.com",       // Missing username
        "email.domain.com",  // Missing @
        "email@domain",      // Missing top level domain (.com/.net/.org/etc)
    ];

    before(() => {
        cy.task("db:seed");
    });

    it('should redirect unauthenticated user to home page', () => {
        cy.visit("/settings");
        cy.location("hash").should("equal", "#/");
    });

    context('Register', () => {

        beforeEach(() => {
            registerPage.visit();
        });

        it('should display correct link to login page', () => {
            cy.contains("Sign in to your account").should("be.visible").and('have.attr', 'href', '#/login');
        });

        it('should redirect to home page after registering, as logged in', () => {
            const username = faker.internet.userName();
            const email = `${username}@example.com`;
            const password = "testPassword";

            registerPage.typeUsername(username);
            registerPage.typeEmail(email);
            registerPage.typePassword(password);
            registerPage.clickSignUp();

            cy.step("Should redirect to Home page");
            cy.location("hash").should("equal", "#/");

            cy.step("User should be logged in");
            header.elements.navItems().filter(":visible").should("contain", username);
        });

        it('should display register form validation errors', () => {
            registerPage.typeUsername("Jon Snow");
            registerPage.clearInput("username");
            registerPage.blurInput("username");

            cy.step("Should display validation error");
            registerPage.elements.validationMessage("username").should("be.visible").and("have.text", "Username is required");

            registerPage.typeEmail("JonSnow@example.com");
            registerPage.clearInput("email");
            registerPage.blurInput("email");

            cy.step("Should display validation error");
            registerPage.elements.validationMessage("email").should("be.visible").and("have.text", "Email is required");

            registerPage.typePassword("s3cret");
            registerPage.clearInput("password");
            registerPage.blurInput("password");

            cy.step("Should display validation error");
            registerPage.elements.validationMessage("password").should("be.visible").and("have.text", "Password is required");

            registerPage.typePassword('abc');

            cy.step("Should display validation error");
            registerPage.elements.validationMessage("password").should("be.visible").and("have.text", "Password must have a minimum 4 characters");

            wrongEmailFormat.forEach((email) => {
                registerPage.clearInput("email");
                registerPage.typeEmail(email);

                cy.step("Should display validation error");
                registerPage.elements.validationMessage("email").should("be.visible").and("have.text", "Incorrect email format");
            });
        });

        it('should display error for taken username', () => {
            registerPage.typeUsername(user.username);
            registerPage.typeEmail("notExist@example.com");
            registerPage.typePassword("s3cret");
            registerPage.clickSignUp();

            cy.step("Should display error message");
            registerPage.elements.errorMessage().should("be.visible").and("have.text", "Username has already been taken");
        });

        it('should display error for taken email', () => {
            registerPage.typeUsername("notExist");
            registerPage.typeEmail(user.email);
            registerPage.typePassword("s3cret");
            registerPage.clickSignUp();

            cy.step("Should display error message");
            registerPage.elements.errorMessage().should("be.visible").and("have.text", "Email has already been taken");
        });
    });

    context('Login', () => {

        beforeEach(() => {
            loginPage.visit();
        });

        it('should display correct link to register page', () => {
            cy.contains("Need an account?").should("be.visible").and('have.attr', 'href', '#/register');
        });

        it('should be able to login and logout', () => {
            loginPage.typeEmail(user.email);
            loginPage.typePassword(user.password);
            loginPage.clickSignIn();
            
            cy.step("Should redirect to Home page");
            cy.location("hash").should("equal", "#/");

            cy.step("User should be logged in");
            header.elements.navItems().should("contain", user.username);

            header.clickNavItem("Logout");

            cy.step("User should be logged out");
            cy.location("hash").should("equal", "#/");
            header.elements.navItems().should("not.contain", user.username);
        });

        it('should display login form validation errors', () => {
            loginPage.typeEmail("jonSnow@example.com");
            loginPage.clearInput("email");
            loginPage.blurInput("email");

            cy.step("Should display validation error");
            loginPage.elements.validationMessage("email").should("be.visible").and("have.text", "Email is required");

            loginPage.typePassword("s3cret");
            loginPage.clearInput("password");
            loginPage.blurInput("password");

            cy.step("Should display validation error");
            loginPage.elements.validationMessage("password").should("be.visible").and("have.text", "Password is required");

            loginPage.typePassword("abc");

            cy.step("Should display validation error");
            loginPage.elements.validationMessage("password").should("be.visible").and("have.text", "Password must have a minimum 4 characters");

            wrongEmailFormat.forEach((email) => {
                loginPage.clearInput("email");
                loginPage.typeEmail(email);

                cy.step("Should display validation error");
                loginPage.elements.validationMessage("email").should("be.visible").and("have.text", "Incorrect email format");
            });
        });

        it('should display error for not existing user', () => {
            loginPage.typeEmail("notExisting@email.com");
            loginPage.typePassword("invalidPassword");
            loginPage.clickSignIn();

            cy.step("Should display error message");
            loginPage.elements.errorMessage().should("be.visible").and("have.text", "Email or password is invalid");
        });

        it('should display error for existing user when invalid password', () => {
            loginPage.typeEmail(user.email);
            loginPage.typePassword("invalidPassword");
            loginPage.clickSignIn();

            cy.step("Should display error message");
            loginPage.elements.errorMessage().should("be.visible").and("have.text", "Email or password is invalidd");
        });
    });
});