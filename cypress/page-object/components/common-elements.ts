// *** HTML elements ***
// Should be used only via Page Object. Not directly in the test files.
export const commonElements = {
    errorMessage: () => cy.getByTestId("error-message"),
    dropdownMenuItems: () => cy.getByTestId("dropdown-item"),
    dropdownMenuItem: (menuItemName: string) => commonElements.dropdownMenuItems().contains(menuItemName),
}
