export const sharedElements = {
    dropdownMenuItems: () => cy.getByTestId("dropdown-item"),
    dropdownMenuItem: (menuItemName: string) => cy.getByTestId("dropdown-item").contains(menuItemName),
}