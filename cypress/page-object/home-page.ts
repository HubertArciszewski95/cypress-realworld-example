class HomePage {

    elements = {

    }

    visit() {
        cy.step('Visit "Home" page');
        cy.visit("/");
    }

}

export default HomePage;
