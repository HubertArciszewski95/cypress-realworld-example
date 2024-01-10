import HomePage from "../page-object/home-page";
import Header from "../page-object/components/header";
import user from "../fixtures/user.json";

describe('Header navigation', () => {
    const homePage = new HomePage();
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
        it('should display correct navigation options and links', () => {
            homePage.visit();

            header.elements.navItems().filter(":visible").should("have.length", 3);

            header.elements.navItem("Home").should("be.visible").and("have.attr", "href", links.home);
            header.elements.navItem("Sign in").should("be.visible").and("have.attr", "href", links.login);
            header.elements.navItem("Sign up").should("be.visible").and("have.attr", "href", links.register);
        });
    });

    context('Logged in', () => {
        it('should display correct navigation options and links', () => {
            cy.login(user.email, user.password);
            homePage.visit();

            header.elements.navItems().filter(":visible").should("have.length", 3);
            header.elements.dropdownMenuItems().should("have.length", 3);

            header.elements.navItem("Home").should("be.visible").and("have.attr", "href", links.home);
            header.elements.navItem("New Article").should("be.visible").and("have.attr", "href", links.newArticle);
            header.elements.navItems().contains(user.username).should("be.visible").and("not.have.attr", "href");

            header.elements.dropdownMenuItem("Profile").should("have.attr", "href", links.profile);
            header.elements.dropdownMenuItem("Settings").should("have.attr", "href", links.settings);
            header.elements.dropdownMenuItem("Logout").should("have.attr", "href", links.logout);
        });
    });
});
