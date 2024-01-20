// *** HTML elements ***
// Should be used only via Page Object. Not directly in the test files.
export const commonElements = {
    emailInput: () => cy.getByTestId("email-input"),
    passwordInput: () => cy.getByTestId("password-input"),
    errorMessage: () => cy.getByTestId("error-message"),
    dropdownMenuItems: () => cy.getByTestId("dropdown-item"),
    dropdownMenuItem: (menuItemName: string) => commonElements.dropdownMenuItems().contains(menuItemName),
}
