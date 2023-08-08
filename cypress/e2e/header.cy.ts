import Header from "../page-object/components/header";
import user from "../fixtures/user-existing.json";

describe('Header', () => {
    const header = new Header();

    const links = {
        home: "#/",
        login: "#/login",
        register: "#/register",
        newArticle: "#/editor",
        profile: `#/profile/${user.username}`,
        settings: "#/settings",
        logout: "#/"
    }

    context('Not logged in', () => {
        it('should display correct links', () => {
            cy.visit("/");

            header.elements.navItems().filter(":visible").should("have.length", 3);

            header.elements.navItem("Home").should("be.visible").and("have.attr", "href", links.home);
            header.elements.navItem("Sign in").should("be.visible").and("have.attr", "href", links.login);
            header.elements.navItem("Sign up").should("be.visible").and("have.attr", "href", links.register);

            // *** TODO: Example for my course (remove when lesson will be done) ***
            // cy.getByTestId("nav-item").filter(":visible").should("have.length", 3);

            // cy.getByTestId("nav-item").contains("Home").should("be.visible").and("have.attr", "href", links.home);
            // cy.getByTestId("nav-item").contains("Sign in").should("be.visible").and("have.attr", "href", links.login);
            // cy.getByTestId("nav-item").contains("Sign up").should("be.visible").and("have.attr", "href", links.register);

        });
    });

    context('Logged in', () => {
        it('should display correct links', () => {
            cy.login();
            cy.visit("/");

            header.elements.navItems().filter(":visible").should("have.length", 3);
            header.elements.dropdownMenuItems().should("have.length", 3);

            header.elements.navItem("Home").should("be.visible").and("have.attr", "href", links.home);
            header.elements.navItem("New Article").should("be.visible").and("have.attr", "href", links.newArticle);
            header.elements.navItems().contains(user.username).should("be.visible").and("not.have.attr", "href");

            header.elements.dropdownMenuItem("Profile").should("have.attr", "href", links.profile);
            header.elements.dropdownMenuItem("Settings").should("have.attr", "href", links.settings);
            header.elements.dropdownMenuItem("Logout").should("have.attr", "href", links.logout);

            // *** TODO: Example for my course (remove when lesson will be done) ***
            // cy.getByTestId("nav-item").filter(":visible").should("have.length", 3);
            // cy.getByTestId("dropdown-item").should("have.length", 3);
            
            // cy.getByTestId("nav-item").contains("Home").should("be.visible").and("have.attr", "href", links.home);
            // cy.getByTestId("nav-item").contains("New Article").should("be.visible").and("have.attr", "href", links.newArticle);
            // cy.getByTestId("nav-item").contains(user.username).should("be.visible").and("not.have.attr", "href");

            // cy.getByTestId("dropdown-item").contains("Profile").should("have.attr", "href", links.profile);
            // cy.getByTestId("dropdown-item").contains("Settings").should("have.attr", "href", links.settings);
            // cy.getByTestId("dropdown-item").contains("Logout").should("have.attr", "href", links.logout);
        });
    });
});
