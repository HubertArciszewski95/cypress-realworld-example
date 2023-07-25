import RegisterPage from "../page-object/register-page";
import LoginPage from "../page-object/login-page";
import HomePage from "../page-object/home-page";

import { faker } from '@faker-js/faker';
import userExisting from "../fixtures/user-existing.json";
import userNotExisting from "../fixtures/user-not-existing.json"


describe('Authentication', () => {
    const registerPage = new RegisterPage();
    const loginPage = new LoginPage();
    const homePage = new HomePage();

    const wrongEmailFormat = [
        "plainaddress",            // Missing @ sign and domain
        "@domain.com",             // Missing username
        "email.domain.com",        // Missing @
        "email@domain",            // Missing top level domain (.com/.net/.org/etc)
        "email@domain@domain.com", // Two @ sign
        ".email@domain.com",       // Leading dot in address is not allowed
        "email.@domain.com",       // Trailing dot in address is not allowed
        "email..email@domain.com", // Multiple dots
        "email@-domain.com",       // Leading dash in front of domain is invalid
        "email@domain..com",       // Multiple dot in the domain portion is invalid
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
            registerPage.navigate();
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

            cy.location("hash").should("equal", "#/");
            homePage.navBar.elements.navItems().filter(":visible").should("contain", username);
        });

        it('should display register validation errors', () => {
            registerPage.typeUsername(userNotExisting.username);
            registerPage.elements.usernameInput().clear().blur();

            registerPage.elements.validationMessage("username").should("be.visible").and("contain", "Username is required");

            registerPage.typeEmail(userNotExisting.email);
            registerPage.elements.emailInput().clear().blur();

            registerPage.elements.validationMessage("email").should("be.visible").and("contain", "Email is required");

            registerPage.typePassword(userNotExisting.password);
            registerPage.elements.passwordInput().clear().blur();

            registerPage.elements.validationMessage("password").should("be.visible").and("contain", "Password is required");

            registerPage.typePassword('abc');
            registerPage.elements.validationMessage("password").should("be.visible").and("contain", "Password must have a minimum 4 characters");

            // cy.visualSnapshot("Display sign up required errors");

            wrongEmailFormat.forEach((email) => {
                registerPage.elements.emailInput().clear();
                registerPage.typeEmail(email);

                registerPage.elements.validationMessage("email").should("be.visible").and("contain", "Incorrect email format");
            });
        });

        it('should display error for taken username', () => {
            registerPage.typeUsername(userExisting.username);
            registerPage.typeEmail(userNotExisting.email);
            registerPage.typePassword(userNotExisting.password);
            registerPage.clickSignUp();

            registerPage.elements.errorMessage().should("be.visible").and("have.text", "Username has already been taken");
            // cy.visualSnapshot("Display sign up already taken error");
        });

        it('should display error for taken email', () => {
            registerPage.typeUsername(userNotExisting.username);
            registerPage.typeEmail(userExisting.email);
            registerPage.typePassword(userNotExisting.password);
            registerPage.clickSignUp();

            registerPage.elements.errorMessage().should("be.visible").and("have.text", "Email has already been taken");
        });
    });

    context('Login', () => {

        beforeEach(() => {
            loginPage.navigate();
        });

        it('should display correct link to register page', () => {
            cy.contains("Need an account?").should("be.visible").and('have.attr', 'href', '#/register');
        });

        it('should be able to login and logout', () => {
            loginPage.typeEmail(userExisting.email);
            loginPage.typePassword(userExisting.password);
            loginPage.clickSignIn();

            cy.location("pathname").should("equal", "/");
            // TODO: Should be called header or navHeader.
            // Also it should be individual PO. Because it's available on all pages. Not only on home.
            homePage.navBar.elements.navItems().should("contain", userExisting.username);

            homePage.navBar.clickNavBarItem("Logout");

            cy.location("pathname").should("equal", "/");
            homePage.navBar.elements.navItems().should("not.contain", userExisting.username);
        });

        it('should display login validation errors', () => {
            loginPage.typeEmail(userNotExisting.email);
            loginPage.elements.emailInput().clear().blur();

            loginPage.elements.validationMessage("email").should("be.visible").and("contain", "Email is required");

            loginPage.typePassword(userNotExisting.password);
            loginPage.elements.passwordInput().clear().blur();

            loginPage.elements.validationMessage("password").should("be.visible").and("contain", "Password is required");

            loginPage.typePassword("abc");
            loginPage.elements.validationMessage("password").should("be.visible").and("contain", "Password must have a minimum 4 characters");

            // cy.visualSnapshot("Display sign up required errors");

            wrongEmailFormat.forEach((email) => {
                loginPage.elements.emailInput().clear();
                loginPage.typeEmail(email);

                loginPage.elements.validationMessage("email").should("be.visible").and("contain", "Incorrect email format");
            });
        });

        it('should display error for invalid user', () => {
            loginPage.typeEmail("invalid@email.com");
            loginPage.typePassword("invalidPassword");
            loginPage.clickSignIn();

            loginPage.elements.errorMessage().should("be.visible").and("contain", "Email or password is invalid");
            // cy.visualSnapshot("Display sign in invalid user error");
        });

        it('should display error for existing user when invalid password', () => {
            loginPage.typeEmail(userExisting.email);
            loginPage.typePassword("invalidPassword");
            loginPage.clickSignIn();

            loginPage.elements.errorMessage().should("be.visible").and("contain", "Email or password is invalid");
        });
    });
});