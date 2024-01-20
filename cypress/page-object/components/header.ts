import { commonElements } from "./common-elements";

type NavItemName =
    | "Home"
    | "Sign in"
    | "Sign up"
    | "New Article"
    | "Profile"
    | "Settings"
    | "Logout"

class Header {

    elements = {
        navItems: () => cy.getByTestId("nav-item"),
        navItem: (navItemName: NavItemName) => this.elements.navItems().contains(navItemName),
        dropdownMenuItems: () => commonElements.dropdownMenuItems(),
        dropdownMenuItem: (menuItem: NavItemName) => commonElements.dropdownMenuItem(menuItem),
    };

    clickNavItem(navItem: NavItemName) {
        const navItemUnderDropdown: Array<NavItemName> = ["Profile", 'Settings', "Logout"];

        cy.step(`Click "${navItem}" nav item`);
        if (navItemUnderDropdown.includes(navItem)) {
            cy.selectDropdownValue(this.elements.navItems().last(), navItem);
        } else {
            this.elements.navItem(navItem).click();
        }
    }

}

export default Header;
