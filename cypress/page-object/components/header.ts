import user from "../../fixtures/user-existing.json";
import { sharedElements } from "./shared-elements";


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
        navItem: (navItem: NavItemName) => this.elements.navItems().contains(navItem),
        dropdownMenuItems: () => sharedElements.dropdownMenuItems(),
        dropdownMenuItem: (menuItem: NavItemName) => sharedElements.dropdownMenuItem(menuItem),
    };

    clickNavItem(navItem: NavItemName) {
        const navItemUnderDropdown = [ "Profile", 'Settings', "Logout"];

        if (navItemUnderDropdown.includes(navItem)) {
            cy.selectDropdownValue(this.elements.navItems().contains(user.username), navItem);
        } else {
            this.elements.navItem(navItem).click();
        }
    }

}

export default Header;
